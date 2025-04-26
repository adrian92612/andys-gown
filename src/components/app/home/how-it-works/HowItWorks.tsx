import { TextLink } from "@/components/global/TextLink";
import { images } from "@/constants/images";
import { route } from "@/constants/routes";
import Image from "next/image";

type StepsProps = {
  heading: string;
  description: React.ReactNode;
};

const Steps = ({ heading, description }: Omit<StepsProps, "iconUrl">) => {
  return (
    <div>
      <h3 className="font-semibold text-site-primary text-lg mb-2">
        {heading}
      </h3>
      <p className="text-site-text-light/80">{description}</p>
    </div>
  );
};

const steps: StepsProps[] = [
  {
    heading: "1. Choose a Gown",
    description: (
      <>
        Browse our{" "}
        <TextLink
          text="catalogue"
          href={route.collections}
          className="font-bold underline"
        />{" "}
        and pick the gown that speaks to you.
      </>
    ),
  },

  {
    heading: "2. Message Us",
    description: (
      <>
        Send us a DM on{" "}
        <TextLink
          text="Facebook"
          href="facebook.com"
          className="font-bold underline"
        />{" "}
        or{" "}
        <TextLink
          text="Instagram"
          href="instagram.com"
          className="font-bold underline"
        />{" "}
        for fittings and reservations.
      </>
    ),
  },
  {
    heading: "3. Pay Down",
    description: "Secure your gown with a ₱500 non-refundable down payment.",
  },
  {
    heading: "4. Pick Up & Shine",
    description:
      "Pick up, wear with confidence, and return according to schedule.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-16 bg-site-text/90 min-h-[450px] flex flex-col justify-center text-site-text-light border-y border-site-border"
    >
      <Image
        src={images.howItWorksBg}
        alt="Red Gow"
        fill
        className="object-cover z-[-1]"
      />
      <div className="max-w-5xl mx-auto px-4 text-center space-y-12">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-site-primary">
            Let&apos;s Get You Dressed
          </h2>
          <p className="max-w-xl mx-auto">
            Renting with us is easy. Just follow these steps to bring your dream
            look to life.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-left px-4 sm:px-8">
          {!!steps.length &&
            steps.map((s, i) => (
              <Steps key={i} heading={s.heading} description={s.description} />
            ))}
        </div>
      </div>
    </section>
  );
};
