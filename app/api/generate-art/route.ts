import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const ALLOWED_SIZES = new Set(['1K', '2K', '4K']);
const ALLOWED_RATIOS = new Set(['16:9', '3:4', '1:1', '4:3']);

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'GEMINI_API_KEY is not configured. Add it in your Vercel Environment Variables or project Secrets.',
        },
        { status: 500 }
      );
    }

    const body = (await req.json()) as {
      prompt?: string;
      imageSize?: string;
      aspectRatio?: string;
    };

    const userPrompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    if (userPrompt.length < 4) {
      return NextResponse.json(
        { error: 'Please enter a scene description of at least 4 characters.' },
        { status: 400 }
      );
    }

    const imageSize = ALLOWED_SIZES.has(body.imageSize ?? '') ? body.imageSize! : '1K';
    const aspectRatio = ALLOWED_RATIOS.has(body.aspectRatio ?? '') ? body.aspectRatio! : '16:9';

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const styledPrompt = `Miami Vice City twilight aesthetic with deep banafsh violet sky and warm coral sunset reflections, cinematic open-world game key art photography: ${userPrompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: styledPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio,
          imageSize,
        },
      },
    });

    let imageDataUrl: string | null = null;
    let textNote = '';

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType ?? 'image/png';
        imageDataUrl = `data:${mime};base64,${part.inlineData.data}`;
      } else if (part.text) {
        textNote += part.text;
      }
    }

    if (!imageDataUrl) {
      return NextResponse.json(
        { error: 'The model did not return an image frame. Try refining your prompt.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      imageDataUrl,
      imageSize,
      aspectRatio,
      textNote: textNote.trim(),
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Image generation request failed.';
    const lower = message.toLowerCase();
    if (lower.includes('permission_denied') || lower.includes('403') || lower.includes('api_key')) {
      return NextResponse.json(
        {
          error:
            'Your API key lacks access to gemini-3-pro-image-preview. Select a billing-enabled key in Settings > Secrets.',
        },
        { status: 403 }
      );
    }
    if (lower.includes('429') || lower.includes('resource_exhausted')) {
      return NextResponse.json(
        {
          error:
            'Quota exceeded for image generation. Please check your paid API key quota in Settings > Secrets.',
        },
        { status: 429 }
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
