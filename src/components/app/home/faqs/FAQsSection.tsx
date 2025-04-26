import { TextLink } from "@/components/global/TextLink";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { route } from "@/constants/routes";
import { MdOutlineArrowRightAlt } from "react-icons/md";

type Faqs = {
  question: string;
  answer: React.ReactNode;
};

export const faqs: Faqs[] = [
  {
    question: "How much is the down payment?",
    answer:
      "A ₱500 down payment is required to reserve your gown. The remaining balance is to be paid on your pickup day. Please note that the down payment is non-refundable.",
  },
  {
    question: "What is the rental duration?",
    answer: (
      <div className="flex flex-col gap-1">
        <span>The rental period is strictly 3 days:</span>
        <span>• Day 1: Pickup Day</span>
        <span>• Day 2: Event Day</span>
        <span>• Day 3: Return Day</span>
        <span>
          Late returns incur a ₱150 fee per day for up to 2 days. A delay of 3+
          days is considered a new rental with full rental fees.
        </span>
      </div>
    ),
  },
  {
    question: "When can I pick up and return my gown?",
    answer:
      "Pickup and return times are strictly between 3:00 PM to 6:00 PM only. You will be notified once your gown is ready for pickup.",
  },
  {
    question: "Can I alter the gown?",
    answer:
      "Alterations are allowed but must be temporary stitches only. If they are not removed before returning the gown, a ₱200 charge will apply.",
  },
  {
    question: "What if the gown gets damaged?",
    answer:
      "Minimal damages (e.g., missing buttons, broken zippers) may forfeit your security deposit. If the gown is lost or damaged beyond repair, you will be charged the full cost of the gown.",
  },
  {
    question: "Can I change my reservation or gown design?",
    answer:
      "Yes, but changes made more than 2 days after reservation will incur a ₱200 penalty.",
  },
  {
    question: "Do I need to clean the gown before returning it?",
    answer:
      "Yes, clients are responsible for cleaning the gown. You may also opt to pay a ₱100 laundry fee for a hassle-free return. Never use a washing machine to clean the gown. A ₱50 charge applies if the eco bag is not returned.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "No rush refunds. Refunds will only be processed after the gown has been inspected. All refunds are sent via GCash. Shipping/delivery fees are shouldered by the client, and no refunds are issued once the gown has been shipped.",
  },
];

export const FAQsSection = () => {
  return (
    <section
      id="faqs"
      className="bg-gradient-to-b from-site-primary/5 to-site-secondary/5"
    >
      <div className="max-w-4xl mx-auto py-20 px-6 sm:px-10">
        <div className="rounded-none shadow-lg bg-site-background backdrop-blur-sm p-10 space-y-5">
          <h2 className="text-3xl font-extrabold text-site-primary">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible>
            {!!faqs.length &&
              faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-site-border"
                >
                  <AccordionTrigger className="text-lg font-bold">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent>{f.answer}</AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
          <div className="flex justify-end">
            <TextLink
              text="See the full Terms and Conditions here"
              href={route.termsAndConditions}
              icon={<MdOutlineArrowRightAlt className="size-5" />}
              className="text-sm sm:text-base"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
