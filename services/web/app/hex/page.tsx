import { Metadata } from 'next';
import HexDetailsForm from './hex-details-form';

export const metadata: Metadata = {
  title: "Hex Converter",
  description: "Online Hex Converter Tool",
}
function HexPage() {
  return (
    <div className="w-full flex flex-col justify-center gap-2">
      <h1 className="prose font-bold text-4xl text-center">
        Hex Converter
      </h1>
      <HexDetailsForm />
    </div>
  )
}

export default HexPage
