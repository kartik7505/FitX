import HeroSection from "@/components/sections/hero";
import BrandExpression from "@/components/sections/brand-expression";
import ProductDetail from "@/components/sections/product-detail";
import InfoExplorer from "@/components/sections/info-explorer";
import TrainingEditorial from "@/components/sections/training-editorial";
import VisualStudy from "@/components/sections/visual-study";
import Gallery from "@/components/sections/gallery";
import ProductAction from "@/components/sections/product-action";

export default function Home() {
  return (
    <main className="relative bg-canvas w-full overflow-hidden">
      <HeroSection />
      <BrandExpression />
      <ProductDetail />
      <InfoExplorer />
      <TrainingEditorial />
      <VisualStudy />
      <Gallery />
      <ProductAction />
    </main>
  );
}
