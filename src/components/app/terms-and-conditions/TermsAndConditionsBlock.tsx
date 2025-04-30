import { SocialMediaMsgBtn } from "@/components/global/SocialMediaMsgBtn";
import { images } from "@/constants/images";
import Image from "next/image";

export const rentalGuidelines: {
  listHeader: string;
  items: React.ReactNode[];
}[] = [
  {
    listHeader: "Reservation & Payment Policy",
    items: [
      "₱500 down payment is required to reserve your gown. Remaining balance is due on pickup day.",
    ],
  },
  {
    listHeader: "Cancellation Policy",
    items: ["₱500 down payment is non-refundable in case of cancellation."],
  },
  {
    listHeader: "Rental Duration & Late Return Fees",
    items: [
      "Rental period is strictly 3 days:",
      <ul className="list-disc pl-6" key="rental-period">
        <li>Day 1: Pickup</li>
        <li>Day 2: Event</li>
        <li>Day 3: Return</li>
      </ul>,
      "₱150/day late fee (up to 2 days max).",
      "3+ days late = new rental; full fees apply.",
    ],
  },
  {
    listHeader: "Pickup and Return Schedule",
    items: [
      "Strictly between 3:00 PM to 6:00 PM only.",
      "You’ll be notified once your gown is ready for pickup.",
    ],
  },
  {
    listHeader: "Gown Inspection & Accountability",
    items: [
      "Inspect rented items upon pickup (Day 1).",
      "Report damages the same day to avoid liability.",
    ],
  },
  {
    listHeader: "Alterations",
    items: [
      <span key="alter1">
        Only <strong>temporary stitches</strong> are allowed.
      </span>,
      "₱200 fee applies if stitches are not removed upon return.",
    ],
  },
  {
    listHeader: "Damages & Loss",
    items: [
      "Security deposit is forfeited for minor damage or missing parts.",
      "Lost/destroyed gown = full cost charged to client.",
    ],
  },
  {
    listHeader: "Changes to Reservation",
    items: ["Design or schedule changes 2+ days after reservation = ₱200 fee."],
  },
  {
    listHeader: "Hygiene & Cleaning Policy",
    items: [
      "Clean the gown before returning.",
      "Or pay ₱100 laundry fee for hassle-free return.",
      <strong key="cleaning-note">
        Do not use a washing machine to avoid damages.
      </strong>,
      "₱50 fee applies if returned without the eco bag.",
    ],
  },
  {
    listHeader: "Refund Policy",
    items: [
      "Refunds are for security deposits only, not cancellations",
      <ul className="list-disc pl-6" key="rental-period">
        <li>Processed after gown inspection; no rush refunds.</li>
        <li>GCash only for refunds.</li>
        <li> No refunds/gown exchange once the gown is shipped.</li>
        <li>
          Late returns incur a ₱150 fee per day for up to 2 days. A delay of 3+
          days is considered a new rental with full rental fees.
        </li>
      </ul>,
    ],
  },
];

export const TermsAndConditionsBlock = () => {
  return (
    <section className="bg-gradient-to-r from-site-text to-site-text/95 px-4 sm:px-8 py-10">
      <div className="max-w-7xl mx-auto text-site-text-light ">
        <div className="mb-10">
          <h2 className="font-bold text-3xl text-site-primary">
            Terms And Conditions
          </h2>
          <p className="text-site-text-light/80 italic text-sm">
            Last Updated: May 01, 2025
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="max-w-[500px]">
            {!!rentalGuidelines &&
              rentalGuidelines.map((r, i) => (
                <div key={i} className="mb-5">
                  <h3 className="text-site-primary/90 font-extrabold">
                    {r.listHeader}
                  </h3>
                  <ul>
                    {!!r.items &&
                      r.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              ))}
          </div>
          <div className="grid place-items-center lg:h-[calc(90dvh-56px)] sticky top-0 ">
            <div className="space-y-5">
              <hr className="lg:hidden border-t border-site-primary w-32 mx-auto" />
              <div className="w-[200px] h-[100px] relative aspect-auto z-10 mx-auto ">
                <Image
                  src={images.logoLight}
                  alt="Andys Gown Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <hr className="hidden lg:block border-t border-site-primary w-32 mx-auto" />
              <p className="font-bold text-lg mb-5 max-w-96 text-center mx-auto">
                For any other inquiries or clarifications you have, feel free to
                DM us on our page
              </p>
              <SocialMediaMsgBtn />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
