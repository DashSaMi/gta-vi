import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 7,
          background: 'linear-gradient(135deg, #1E0B36 0%, #090612 65%, #3B0D36 100%)',
          border: '1px solid rgba(251, 113, 133, 0.45)',
          color: '#FDA4AF',
          fontSize: 17,
          fontWeight: 900,
          letterSpacing: '0.04em',
        }}
      >
        VI
      </div>
    ),
    {
      ...size,
    }
  );
}
