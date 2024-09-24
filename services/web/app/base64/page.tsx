import { Metadata } from 'next';
import Base64FormDetails from './base64-form-details';


export const metadata: Metadata = {
  title: "Base64 Converter",
  description: "Online Base64 Converter Tool",
}


function Base64Page() {
  return (
    <div className="w-full flex flex-col justify-center gap-2">
      <h1 className="prose font-bold text-4xl text-center">
        Base64 Converter
      </h1>
      <Base64FormDetails />
    </div>
  )
}

export default Base64Page
