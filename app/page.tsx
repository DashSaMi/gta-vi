import { HeroSection } from '@/components/HeroSection';
import { ThankYouWall } from '@/components/ThankYouWall';
import { ProtagonistsSection } from '@/components/ProtagonistsSection';
import { RockstarChronicle } from '@/components/RockstarChronicle';
import { GtaSurveySection } from '@/components/GtaSurveySection';
import { ViceArtStudio } from '@/components/ViceArtStudio';
import { CreatorSpotlightSection } from '@/components/CreatorSpotlightSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProtagonistsSection />
      <RockstarChronicle />
      <GtaSurveySection />
      <ViceArtStudio />
      <ThankYouWall />
      <CreatorSpotlightSection />
    </>
  );
}
