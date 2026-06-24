import type { ServiceAudienceRecord } from "@/lib/data/services";

const syrianFeaturedItemSlugs = [
  "oman",
  "uae",
  "saudi",
  "lebanon",
  "indonesia",
  "jordan",
  "erbil",
  "baghdad",
];

const iraqiFeaturedItemSlugs = ["oman", "uae", "indonesia", "jordan"];

const syrianUaeResidentFeaturedItemSlugs = ["oman"];

function dedupeSlugs(slugs: string[]) {
  return Array.from(new Set(slugs));
}

function dedupeSecondaryDestinations(audiences: ServiceAudienceRecord[]) {
  const seen = new Map<string, ServiceAudienceRecord["secondaryDestinations"][number]>();

  audiences.forEach((audience) => {
    audience.secondaryDestinations.forEach((destination) => {
      if (!seen.has(destination.slug)) {
        seen.set(destination.slug, destination);
      }
    });
  });

  return Array.from(seen.values());
}

const visaAudiencesArBase: ServiceAudienceRecord[] = [
  {
    slug: "syrian",
    label: "الجنسية السورية",
    featuredItemSlugs: syrianFeaturedItemSlugs,
    secondaryDestinations: [
      {
        slug: "libya",
        title: "ليبيا",
        summary: "خيار سريع للحالات التي تحتاج موافقة دخول مباشرة إلى ليبيا.",
        requirements: ["صورة عن جواز السفر"],
        offerings: [
          {
            name: "موافقة دخول",
            validity: "بحسب الإجراء",
            turnaround: "فوراً",
          },
        ],
        contactNote: "راسلنا عبر واتساب لنؤكد لك الأوراق المطلوبة ونباشر طلب ليبيا بحسب حالتك.",
      },
      {
        slug: "egypt",
        title: "مصر",
        summary: "خدمة موافقة دخول إلى مصر بإجراء واضح ومدة إنجاز قصيرة نسبياً.",
        requirements: [],
        offerings: [
          {
            name: "موافقة دخول",
            validity: "بحسب الإجراء",
            turnaround: "3 إلى 7 أيام",
          },
        ],
        contactNote: "راسلنا عبر واتساب لنوضح لك متطلبات مصر الحالية قبل بدء الطلب.",
      },
      {
        slug: "mozambique",
        title: "موزمبيق",
        summary: "فيزا سياحية بمدة إنجاز متوسطة للحالات الراغبة بالسفر إلى موزمبيق.",
        requirements: [],
        offerings: [
          {
            name: "فيزا سياحية",
            validity: "بحسب الإجراء",
            turnaround: "10 إلى 15 يوم عمل",
          },
        ],
        contactNote: "تواصل معنا عبر واتساب لنعطيك صورة أوضح عن متطلبات موزمبيق الحالية.",
      },
      {
        slug: "sierra-leone",
        title: "سيراليون",
        summary: "خيار سياحي متاح مع مدة إنجاز واضحة للحالات الجاهزة.",
        requirements: [],
        offerings: [
          {
            name: "فيزا سياحية",
            validity: "بحسب الإجراء",
            turnaround: "10 إلى 15 يوم عمل",
          },
        ],
        contactNote: "راسلنا عبر واتساب لتأكيد الأوراق المطلوبة وآخر تحديثات سيراليون.",
      },
      {
        slug: "kenya",
        title: "كينيا",
        summary: "فيزا سياحية إلى كينيا ضمن مسار واضح ومدة إنجاز متوقعة.",
        requirements: [],
        offerings: [
          {
            name: "فيزا سياحية",
            validity: "بحسب الإجراء",
            turnaround: "10 إلى 15 يوم عمل",
          },
        ],
        contactNote: "راسلنا عبر واتساب لنراجع معك متطلبات كينيا ونرتب الخطوة التالية.",
      },
      {
        slug: "cambodia",
        title: "كمبوديا",
        summary: "خيار سياحي مناسب لمن يبحث عن وجهة آسيوية بإجراء مباشر.",
        requirements: [],
        offerings: [
          {
            name: "فيزا سياحية",
            validity: "بحسب الإجراء",
            turnaround: "10 إلى 15 يوم عمل",
          },
        ],
        contactNote: "تواصل معنا عبر واتساب لنعطيك تفاصيل كمبوديا المطلوبة حالياً.",
      },
      {
        slug: "thailand",
        title: "تايلند",
        summary: "فيزا سياحية إلى تايلند مع وقت إنجاز واضح ومتابعة مباشرة.",
        requirements: [],
        offerings: [
          {
            name: "فيزا سياحية",
            validity: "بحسب الإجراء",
            turnaround: "10 إلى 15 يوم عمل",
          },
        ],
        contactNote: "راسلنا عبر واتساب لنؤكد لك الأوراق المطلوبة وآخر المتاح لتايلند.",
      },
      {
        slug: "guinea",
        title: "غينيا",
        summary: "خيار سياحي متاح إلى غينيا بمدة إنجاز متوسطة.",
        requirements: [],
        offerings: [
          {
            name: "فيزا سياحية",
            validity: "بحسب الإجراء",
            turnaround: "10 إلى 15 يوم عمل",
          },
        ],
        contactNote: "تواصل معنا عبر واتساب لنعطيك تحديث غينيا ومتطلبات البدء.",
      },
      {
        slug: "liberia",
        title: "ليبيريا",
        summary: "فيزا سياحية إلى ليبيريا ضمن مسار بسيط ومباشر.",
        requirements: [],
        offerings: [
          {
            name: "فيزا سياحية",
            validity: "بحسب الإجراء",
            turnaround: "10 إلى 15 يوم عمل",
          },
        ],
        contactNote: "راسلنا عبر واتساب لنوضح لك خطوات ليبيريا الحالية قبل التقديم.",
      },
      {
        slug: "ethiopia",
        title: "إثيوبيا",
        summary: "خدمة فيزا سياحية إلى إثيوبيا مع متابعة سريعة للحالات الجاهزة.",
        requirements: [],
        offerings: [
          {
            name: "فيزا سياحية",
            validity: "بحسب الإجراء",
            turnaround: "10 إلى 15 يوم عمل",
          },
        ],
        contactNote: "تواصل معنا عبر واتساب للتأكد من المستندات المطلوبة لإثيوبيا.",
      },
      {
        slug: "laos",
        title: "لاوس",
        summary: "وجهة إضافية متاحة للسفر السياحي بمدة إنجاز واضحة.",
        requirements: [],
        offerings: [
          {
            name: "فيزا سياحية",
            validity: "بحسب الإجراء",
            turnaround: "10 إلى 15 يوم عمل",
          },
        ],
        contactNote: "راسلنا عبر واتساب لنعرض لك متطلبات لاوس وخطوات التقديم.",
      },
      {
        slug: "vietnam",
        title: "فيتنام",
        summary: "فيزا سياحية إلى فيتنام ضمن مسار مرتب وسهل المتابعة.",
        requirements: [],
        offerings: [
          {
            name: "فيزا سياحية",
            validity: "بحسب الإجراء",
            turnaround: "10 إلى 15 يوم عمل",
          },
        ],
        contactNote: "تواصل معنا عبر واتساب لنؤكد لك أوراق فيتنام ونبدأ بالإجراء المناسب.",
      },
    ],
  },
  {
    slug: "iraqi",
    label: "الجنسية العراقية",
    featuredItemSlugs: iraqiFeaturedItemSlugs,
    secondaryDestinations: [
      {
        slug: "libya",
        title: "ليبيا",
        summary: "مسار موافقة دخول إلى ليبيا مخصص للحالات العراقية مع متابعة مباشرة.",
        requirements: ["صورة عن جواز السفر"],
        offerings: [
          {
            name: "موافقة دخول + تكت طيران",
            validity: "بحسب الإجراء",
            turnaround: "بحسب الحالة",
          },
        ],
        contactNote: "راسلنا عبر واتساب لنؤكد لك جاهزية طلب ليبيا والمتطلبات المرتبطة بالحجز.",
      },
      {
        slug: "armenia",
        title: "أرمينيا",
        summary: "أكثر من خيار إقامة في أرمينيا بمتطلبات واضحة ومدة إنجاز معروفة.",
        requirements: ["صورة عن جواز السفر", "صورة شخصية بخلفية بيضاء"],
        offerings: [
          {
            name: "إقامة 21 يوم",
            validity: "21 يوماً",
            turnaround: "4 إلى 7 يوم عمل",
          },
          {
            name: "إقامة 120 يوم",
            validity: "120 يوماً",
            turnaround: "4 إلى 7 يوم عمل",
          },
        ],
        contactNote: "تواصل معنا عبر واتساب لنرتب لك خيار أرمينيا الأنسب حسب مدة الإقامة المطلوبة.",
      },
      {
        slug: "sri-lanka",
        title: "سريلانكا",
        summary: "فيزا شهر إلى سريلانكا بإجراء واضح ومباشر.",
        requirements: [
          "صورة عن جواز السفر",
          "صورة شخصية بخلفية بيضاء",
          "تاريخ السفر",
          "اسم المطار",
        ],
        offerings: [
          {
            name: "شهر",
            validity: "شهر",
            turnaround: "2 إلى 7 يوم عمل",
          },
        ],
        contactNote: "راسلنا عبر واتساب لنثبت لك متطلبات سريلانكا وننسق موعد السفر.",
      },
      {
        slug: "egypt",
        title: "مصر",
        summary: "خياران مختلفان إلى مصر بحسب الفئة العمرية ومدة إنجاز كل حالة.",
        requirements: ["صورة عن جواز السفر"],
        offerings: [
          {
            name: "شهر للفئة بين 16 و60 سنة",
            validity: "شهر",
            turnaround: "10 إلى 14 يوم عمل",
          },
          {
            name: "شهر للفئة فوق 60 أو تحت 16 سنة",
            validity: "شهر",
            turnaround: "3 إلى 5 يوم عمل",
          },
        ],
        contactNote: "تواصل معنا عبر واتساب لنحدد لك مسار مصر المناسب حسب العمر والحالة.",
      },
      {
        slug: "thailand",
        title: "تايلاند",
        summary: "خدمة 60 يوم إلى تايلاند بثلاثة مسارات حسب سرعة الإنجاز.",
        requirements: [
          "صورة عن جواز السفر",
          "صورة شخصية بخلفية بيضاء",
          "كشف حساب بنكي إن وجد",
          "صورة عن البطاقة الموحدة",
          "صورة عن بطاقة السكن",
        ],
        offerings: [
          {
            name: "60 يوم",
            validity: "60 يوماً",
            turnaround: "10 إلى 15 يوم عمل",
          },
          {
            name: "60 يوم سريعة",
            validity: "60 يوماً",
            turnaround: "5 إلى 7 يوم عمل",
          },
          {
            name: "60 يوم VIP",
            validity: "60 يوماً",
            turnaround: "24 إلى 72 ساعة عمل",
          },
        ],
        contactNote: "راسلنا عبر واتساب لنرتب لك مسار تايلاند المناسب حسب السرعة المطلوبة.",
      },
      {
        slug: "georgia",
        title: "جورجيا",
        summary: "فيزا شهر إلى جورجيا بإجراء واضح للحالات العراقية.",
        requirements: ["صورة عن جواز السفر", "صورة شخصية بخلفية بيضاء"],
        offerings: [
          {
            name: "شهر",
            validity: "شهر",
            turnaround: "10 إلى 15 يوم عمل",
          },
        ],
        contactNote: "تواصل معنا عبر واتساب لنثبت لك متطلبات جورجيا ونرتب التقديم.",
      },
      {
        slug: "cambodia",
        title: "كمبوديا",
        summary: "خيار سياحي إلى كمبوديا بمدة إنجاز متوسطة ومتطلبات مباشرة.",
        requirements: ["صورة عن جواز السفر", "صورة شخصية بخلفية بيضاء"],
        offerings: [
          {
            name: "شهر",
            validity: "شهر",
            turnaround: "3 إلى 5 يوم عمل",
          },
        ],
        contactNote: "راسلنا عبر واتساب لنراجع معك متطلبات كمبوديا قبل البدء.",
      },
    ],
  },
  {
    slug: "syrian-uae-resident",
    label: "حاملين الإقامات الخليجية",
    featuredItemSlugs: syrianUaeResidentFeaturedItemSlugs,
    secondaryDestinations: [
      {
        slug: "maldives",
        title: "جزر المالديف",
        summary: "خيار سياحي متاح لحاملي الإقامة الإماراتية من الجنسية السورية.",
        requirements: ["صورة عن جواز السفر", "صورة شخصية بخلفية بيضاء", "صورة عن الإقامة"],
        offerings: [
          {
            name: "سياحية",
            validity: "بحسب الإجراء",
            turnaround: "بحسب الحالة",
          },
        ],
        contactNote: "تواصل معنا عبر واتساب لنوضح لك المتاح حالياً لجزر المالديف حسب إقامة الإمارات.",
      },
      {
        slug: "georgia",
        title: "جورجيا",
        summary: "خيار سياحي إضافي للسوريين حاملي الإقامة الإماراتية ضمن نفس القسم.",
        requirements: ["صورة عن جواز السفر", "صورة شخصية بخلفية بيضاء", "صورة عن الإقامة"],
        offerings: [
          {
            name: "سياحية",
            validity: "بحسب الإجراء",
            turnaround: "بحسب الحالة",
          },
        ],
        contactNote: "راسلنا عبر واتساب لنؤكد لك شروط جورجيا الحالية لحاملي الإقامة الإماراتية.",
      },
      {
        slug: "armenia",
        title: "أرمينيا",
        summary: "خيار سياحي إلى أرمينيا ضمن الفئة الخاصة بحاملي الإقامة الإماراتية.",
        requirements: ["صورة عن جواز السفر", "صورة شخصية بخلفية بيضاء", "صورة عن الإقامة"],
        offerings: [
          {
            name: "سياحية",
            validity: "بحسب الإجراء",
            turnaround: "بحسب الحالة",
          },
        ],
        contactNote: "تواصل معنا عبر واتساب لنشرح لك متطلبات أرمينيا الخاصة بحاملي الإقامة الإماراتية.",
      },
    ],
  },
];

export const visaAudiencesAr: ServiceAudienceRecord[] = [
  ...visaAudiencesArBase,
  {
    slug: "other",
    label: "جنسيات أخرى",
    featuredItemSlugs: dedupeSlugs(visaAudiencesArBase.flatMap((audience) => audience.featuredItemSlugs)),
    secondaryDestinations: dedupeSecondaryDestinations(visaAudiencesArBase),
  },
];

const visaAudiencesEnBase: ServiceAudienceRecord[] = [
  {
    slug: "syrian",
    label: "Syrian nationality",
    featuredItemSlugs: syrianFeaturedItemSlugs,
    secondaryDestinations: [
      {
        slug: "libya",
        title: "Libya",
        summary: "A fast Libya entry approval path for cases ready to move immediately.",
        requirements: ["Passport copy"],
        offerings: [
          {
            name: "Entry approval",
            validity: "Depends on the procedure",
            turnaround: "Immediate",
          },
        ],
        contactNote: "Message us on WhatsApp so we can confirm the current Libya requirements and start your case properly.",
      },
      {
        slug: "egypt",
        title: "Egypt",
        summary: "Egypt entry approval with a straightforward process and a relatively short turnaround.",
        requirements: [],
        offerings: [
          {
            name: "Entry approval",
            validity: "Depends on the procedure",
            turnaround: "3 to 7 days",
          },
        ],
        contactNote: "Message us on WhatsApp so we can confirm the current Egypt requirements before starting the request.",
      },
      {
        slug: "mozambique",
        title: "Mozambique",
        summary: "Tourist visa option for travelers heading to Mozambique with a clear expected turnaround.",
        requirements: [],
        offerings: [
          {
            name: "Tourist visa",
            validity: "Depends on the procedure",
            turnaround: "10 to 15 working days",
          },
        ],
        contactNote: "Contact us on WhatsApp for the latest Mozambique requirements and next steps.",
      },
      {
        slug: "sierra-leone",
        title: "Sierra Leone",
        summary: "Available tourist visa option with a clear turnaround for ready-to-apply cases.",
        requirements: [],
        offerings: [
          {
            name: "Tourist visa",
            validity: "Depends on the procedure",
            turnaround: "10 to 15 working days",
          },
        ],
        contactNote: "Message us on WhatsApp to confirm the required documents and latest Sierra Leone updates.",
      },
      {
        slug: "kenya",
        title: "Kenya",
        summary: "Tourist visa to Kenya with a predictable process and expected turnaround.",
        requirements: [],
        offerings: [
          {
            name: "Tourist visa",
            validity: "Depends on the procedure",
            turnaround: "10 to 15 working days",
          },
        ],
        contactNote: "Message us on WhatsApp so we can review the Kenya requirements and arrange the next step.",
      },
      {
        slug: "cambodia",
        title: "Cambodia",
        summary: "A direct tourist option for travelers looking for an Asian destination.",
        requirements: [],
        offerings: [
          {
            name: "Tourist visa",
            validity: "Depends on the procedure",
            turnaround: "10 to 15 working days",
          },
        ],
        contactNote: "Contact us on WhatsApp and we will share the current Cambodia requirements with you.",
      },
      {
        slug: "thailand",
        title: "Thailand",
        summary: "Tourist visa to Thailand with a clear turnaround and direct follow-up.",
        requirements: [],
        offerings: [
          {
            name: "Tourist visa",
            validity: "Depends on the procedure",
            turnaround: "10 to 15 working days",
          },
        ],
        contactNote: "Message us on WhatsApp so we can confirm the current Thailand requirements and availability.",
      },
      {
        slug: "guinea",
        title: "Guinea",
        summary: "Available tourist route to Guinea with a medium turnaround time.",
        requirements: [],
        offerings: [
          {
            name: "Tourist visa",
            validity: "Depends on the procedure",
            turnaround: "10 to 15 working days",
          },
        ],
        contactNote: "Contact us on WhatsApp for the latest Guinea route details and startup requirements.",
      },
      {
        slug: "liberia",
        title: "Liberia",
        summary: "Tourist visa to Liberia through a simple and direct service path.",
        requirements: [],
        offerings: [
          {
            name: "Tourist visa",
            validity: "Depends on the procedure",
            turnaround: "10 to 15 working days",
          },
        ],
        contactNote: "Message us on WhatsApp so we can explain the current Liberia steps before submission.",
      },
      {
        slug: "ethiopia",
        title: "Ethiopia",
        summary: "Tourist visa service for Ethiopia with quick follow-up for ready cases.",
        requirements: [],
        offerings: [
          {
            name: "Tourist visa",
            validity: "Depends on the procedure",
            turnaround: "10 to 15 working days",
          },
        ],
        contactNote: "Contact us on WhatsApp to verify the documents currently required for Ethiopia.",
      },
      {
        slug: "laos",
        title: "Laos",
        summary: "An additional travel destination with a clear tourist visa turnaround.",
        requirements: [],
        offerings: [
          {
            name: "Tourist visa",
            validity: "Depends on the procedure",
            turnaround: "10 to 15 working days",
          },
        ],
        contactNote: "Message us on WhatsApp to review the Laos requirements and application steps.",
      },
      {
        slug: "vietnam",
        title: "Vietnam",
        summary: "Tourist visa to Vietnam within a structured and easy-to-follow process.",
        requirements: [],
        offerings: [
          {
            name: "Tourist visa",
            validity: "Depends on the procedure",
            turnaround: "10 to 15 working days",
          },
        ],
        contactNote: "Contact us on WhatsApp so we can confirm the Vietnam documents and start the right process.",
      },
    ],
  },
  {
    slug: "iraqi",
    label: "Iraqi nationality",
    featuredItemSlugs: iraqiFeaturedItemSlugs,
    secondaryDestinations: [
      {
        slug: "libya",
        title: "Libya",
        summary: "A Libya entry approval path for Iraqi cases with direct booking-related follow-up.",
        requirements: ["Passport copy"],
        offerings: [
          {
            name: "Entry approval + flight ticket",
            validity: "Depends on the procedure",
            turnaround: "Case-based",
          },
        ],
        contactNote: "Message us on WhatsApp so we can confirm Libya readiness and the booking-related requirements.",
      },
      {
        slug: "armenia",
        title: "Armenia",
        summary: "Multiple Armenia stay options with clear requirements and a known turnaround.",
        requirements: ["Passport copy", "White-background personal photo"],
        offerings: [
          {
            name: "21-day stay",
            validity: "21 days",
            turnaround: "4 to 7 working days",
          },
          {
            name: "120-day stay",
            validity: "120 days",
            turnaround: "4 to 7 working days",
          },
        ],
        contactNote: "Contact us on WhatsApp so we can arrange the Armenia option that fits your intended stay.",
      },
      {
        slug: "sri-lanka",
        title: "Sri Lanka",
        summary: "One-month visa to Sri Lanka through a clear and direct process.",
        requirements: [
          "Passport copy",
          "White-background personal photo",
          "Travel date",
          "Airport name",
        ],
        offerings: [
          {
            name: "One month",
            validity: "One month",
            turnaround: "2 to 7 working days",
          },
        ],
        contactNote: "Message us on WhatsApp so we can confirm the Sri Lanka requirements and coordinate the travel details.",
      },
      {
        slug: "egypt",
        title: "Egypt",
        summary: "Two Egypt paths depending on the age group, each with its own turnaround.",
        requirements: ["Passport copy"],
        offerings: [
          {
            name: "One month for ages 16 to 60",
            validity: "One month",
            turnaround: "10 to 14 working days",
          },
          {
            name: "One month for above 60 or below 16",
            validity: "One month",
            turnaround: "3 to 5 working days",
          },
        ],
        contactNote: "Contact us on WhatsApp so we can match you with the right Egypt path based on age and case details.",
      },
      {
        slug: "thailand",
        title: "Thailand",
        summary: "Thailand 60-day service with three paths depending on the speed required.",
        requirements: [
          "Passport copy",
          "White-background personal photo",
          "Bank statement if available",
          "Unified card copy",
          "Housing card copy",
        ],
        offerings: [
          {
            name: "60 days",
            validity: "60 days",
            turnaround: "10 to 15 working days",
          },
          {
            name: "60 days fast",
            validity: "60 days",
            turnaround: "5 to 7 working days",
          },
          {
            name: "60 days VIP",
            validity: "60 days",
            turnaround: "24 to 72 working hours",
          },
        ],
        contactNote: "Message us on WhatsApp so we can arrange the Thailand route that fits your required speed.",
      },
      {
        slug: "georgia",
        title: "Georgia",
        summary: "A one-month Georgia visa path designed for Iraqi applicants.",
        requirements: ["Passport copy", "White-background personal photo"],
        offerings: [
          {
            name: "One month",
            validity: "One month",
            turnaround: "10 to 15 working days",
          },
        ],
        contactNote: "Contact us on WhatsApp to confirm the Georgia requirements and move ahead with the request.",
      },
      {
        slug: "cambodia",
        title: "Cambodia",
        summary: "Tourist option for Cambodia with a medium turnaround and straightforward requirements.",
        requirements: ["Passport copy", "White-background personal photo"],
        offerings: [
          {
            name: "One month",
            validity: "One month",
            turnaround: "3 to 5 working days",
          },
        ],
        contactNote: "Message us on WhatsApp so we can review the Cambodia documents with you before starting.",
      },
    ],
  },
  {
    slug: "syrian-uae-resident",
    label: "Gulf residency holders",
    featuredItemSlugs: syrianUaeResidentFeaturedItemSlugs,
    secondaryDestinations: [
      {
        slug: "maldives",
        title: "Maldives",
        summary: "A tourist option currently available for Syrian clients holding UAE residency.",
        requirements: ["Passport copy", "White-background personal photo", "Residency copy"],
        offerings: [
          {
            name: "Tourist",
            validity: "Depends on the procedure",
            turnaround: "Case-based",
          },
        ],
        contactNote: "Contact us on WhatsApp so we can clarify what is currently available for the Maldives based on your UAE residency.",
      },
      {
        slug: "georgia",
        title: "Georgia",
        summary: "An additional tourist option for Syrian clients holding UAE residency within the same service section.",
        requirements: ["Passport copy", "White-background personal photo", "Residency copy"],
        offerings: [
          {
            name: "Tourist",
            validity: "Depends on the procedure",
            turnaround: "Case-based",
          },
        ],
        contactNote: "Message us on WhatsApp so we can confirm the latest Georgia conditions for UAE residency holders.",
      },
      {
        slug: "armenia",
        title: "Armenia",
        summary: "A tourist option to Armenia under the UAE residency holder category.",
        requirements: ["Passport copy", "White-background personal photo", "Residency copy"],
        offerings: [
          {
            name: "Tourist",
            validity: "Depends on the procedure",
            turnaround: "Case-based",
          },
        ],
        contactNote: "Contact us on WhatsApp so we can explain the Armenia requirements for UAE residency holders.",
      },
    ],
  },
];

export const visaAudiencesEn: ServiceAudienceRecord[] = [
  ...visaAudiencesEnBase,
  {
    slug: "other",
    label: "Other nationalities",
    featuredItemSlugs: dedupeSlugs(visaAudiencesEnBase.flatMap((audience) => audience.featuredItemSlugs)),
    secondaryDestinations: dedupeSecondaryDestinations(visaAudiencesEnBase),
  },
];
