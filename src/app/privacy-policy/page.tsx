
import Image from 'next/image';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
           <div className="text-center">
                <Image
                    src="https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/LogoN.png"
                    alt="Ayurveda at Tips Logo"
                    width={120}
                    height={120}
                    className="mx-auto mb-8 h-auto w-[120px] object-contain"
                />
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
                    Privacy Policy
                </h1>
            </div>
          <div className="mt-8 space-y-6 text-lg text-foreground/80 text-left">
            <p>
                At Ayurveda at Tips, we respect your privacy and are committed to protecting your personal information.
            </p>
            <p>
                We collect basic information such as your name, email address, and responses to the dosha test in order to provide personalized wellness recommendations.
            </p>
            <p>
                Your information is used only to improve your experience on the platform and to deliver relevant Ayurvedic insights.
            </p>
            <p>
                We do not sell or share your personal data with third parties without your consent.
            </p>
            <p>
                All user information is stored securely and handled with care.
            </p>
            <p>
                By using Ayurveda at Tips, you agree to the collection and use of information in accordance with this policy.
            </p>
            <p>
                For privacy-related concerns, please contact us at: <a href="mailto:privacy@ayurvedaattips.com" className="text-primary hover:underline">privacy@ayurvedaattips.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
