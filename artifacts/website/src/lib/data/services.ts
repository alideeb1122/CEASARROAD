export type Locale = "ar" | "en";

export function decodeArabicMojibake(text: string) {
  const arabicCount = Array.from(text).filter((char) => /[?-?]/.test(char)).length;
  const suspiciousCount = Array.from(text).filter((char) => char === "?" || char === "?").length;

  if (arabicCount < 4 || suspiciousCount / arabicCount < 0.22) {
    return text;
  }

  const decoded = Buffer.from(text, "latin1").toString("utf8");
  const decodedArabicCount = Array.from(decoded).filter((char) => /[?-?]/.test(char)).length;
  const decodedSuspiciousCount = Array.from(decoded).filter((char) => char === "?" || char === "?").length;

  if (decoded.includes("?") || decodedArabicCount === 0) {
    return text;
  }

  return decodedSuspiciousCount / decodedArabicCount < suspiciousCount / arabicCount ? decoded : text;
}

export type ServiceItemRecord = {
  slug: string;
  title: string;
  shortLabel: string;
  summary: string;
  heroTag: string;
  description: string;
  image?: string;
  imageAlt?: string;
  landmarkImage?: string;
  landmarkAlt?: string;
  requirementsImage?: string;
  requirementsImageAlt?: string;
  servicesImage?: string;
  servicesImageAlt?: string;
  imagePosition?: string;
  landmarkPosition?: string;
  requirementsPosition?: string;
  servicesPosition?: string;
  requirementsTitle: string;
  requirements: string[];
  servicesTitle: string;
  offerings: Array<{
    name: string;
    validity: string;
    turnaround: string;
  }>;
  contactNote: string;
};

export type ServiceRecord = {
  slug: string;
  icon: string;
  title: string;
  eyebrow: string;
  summary: string;
  detail: string;
  highlights: string[];
  cardCta: string;
  heroTitle: string;
  heroSubtitle: string;
  optionsTitle: string;
  optionsSubtitle: string;
  previewImage?: string;
  previewImageAlt?: string;
  previewImagePosition?: string;
  items: ServiceItemRecord[];
  testimonials?: Array<{
    name: string;
    text: string;
    context: string;
  }>;
};

type ServicesDictionary = {
  listing: {
    label: string;
    title: string;
    subtitle: string;
    intro: string;
    stats: Array<{ value: string; label: string }>;
    spotlightTitle: string;
    spotlightText: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaBtn: string;
    whatsapp: string;
    services: ServiceRecord[];
  };
  common: {
    homeLabel: string;
    servicesLabel: string;
    serviceDetailsLabel: string;
    optionsLabel: string;
    exploreLabel: string;
    backToServices: string;
    availableItems: string;
    requirementsLabel: string;
    whatsAppLabel: string;
    previousLabel: string;
    nextLabel: string;
    validityLabel: string;
    turnaroundLabel: string;
    returnToService: string;
    customerVoicesTitle: string;
    customerVoices: Array<{ name: string; text: string; gender?: "male" | "female" }>;
  };
};

export const servicesContent: Record<Locale, ServicesDictionary> = {
  "ar": {
    "listing": {
      "label": "خدماتنا",
      "title": "خدمات سفر واضحة وسريعة التنفيذ",
      "subtitle": "من التأشيرات إلى حجوزات الطيران والدراسة واختبارات اللغة، نقدّم كل خدمة بشكل أوضح لتفهم خياراتك بسرعة وتبدأ بدون تعقيد.",
      "intro": "رتّبنا خدماتنا بطريقة أبسط: اختر الخدمة أولًا، ثم راجع الخيارات المتاحة، وبعدها اطّلع على المتطلبات بوضوح قبل أن تبدأ.",
      "stats": [
        {
          "value": "4",
          "label": "خدمات رئيسية"
        },
        {
          "value": "12",
          "label": "خيار متاح"
        },
        {
          "value": "24/7",
          "label": "دعم مباشر"
        }
      ],
      "spotlightTitle": "اختر خدمتك وابدأ بخطوات واضحة",
      "spotlightText": "كل بطاقة تقودك إلى صفحة خدمة مرتبة، فيها الخيارات الأساسية والمتطلبات وطريقة المتابعة بشكل واضح ومباشر.",
      "ctaTitle": "ابدأ من الخيار المناسب لك",
      "ctaSubtitle": "راسلنا عبر واتساب وسنوجّهك مباشرة إلى الخدمة أو الوجهة أو نوع الحجز الأنسب لطلبك.",
      "ctaBtn": "تواصل عبر واتساب",
      "whatsapp": "971501234567",
      "services": [
        {
          "slug": "visa-residency",
          "icon": "passport",
          "title": "التأشيرات والإقامات",
          "eyebrow": "خدمة منظمة",
          "summary": "نرتب لك خدمات التأشيرات والإقامات حسب الوجهة، مع خطوات واضحة من اختيار الدولة حتى تجهيز الأوراق والمتابعة.",
          "detail": "هذه الخدمة منظمة لتساعد العميل على فهم الوجهات المتاحة بسرعة، ومراجعة الأوراق الصحيحة مبكرًا، ثم التقدم بخطوات أقل وأسئلة أقل.",
          "highlights": [
            "ترتيب واضح حسب الوجهة",
            "تفاصيل مركزة لكل إجراء",
            "متابعة مباشرة حتى يتحرك الطلب"
          ],
          "cardCta": "عرض الوجهات",
          "heroTitle": "التأشيرات والإقامات بشكل أوضح وأكثر ثقة",
          "heroSubtitle": "نرتب الوجهات والمتطلبات ومسارات الخدمة بطريقة تساعد العميل على اتخاذ القرار أسرع وبدء الإجراء الصحيح دون ارتباك.",
          "optionsTitle": "الوجهات المتاحة ومسارات الخدمة",
          "optionsSubtitle": "افتح كل وجهة لمراجعة المتطلبات والمدة ووقت الإنجاز والدعم المرتبط بالحالة.",
          "items": [
            {
              "slug": "oman",
              "title": "سلطنة عُمان",
              "shortLabel": "عُمان",
              "summary": "نموذج أولي لصفحة وجهة تتضمن المتطلبات وخيارات الخدمة بشكل واضح.",
              "heroTag": "خيار متاح",
              "description": "هذه الصفحة تعرض نبذة مختصرة عن الوجهة، والأوراق المطلوبة، والخدمات المتاحة ضمن مسار مرتب وسهل القراءة.",
              "requirementsTitle": "المتطلبات الرسمية",
              "requirements": [
                "جواز سفر ساري المفعول",
                "صورة شخصية حديثة",
                "نسخة هوية أو إقامة عند الحاجة",
                "تفاصيل السفر أو معلومات الحجز الأولي"
              ],
              "servicesTitle": "الخدمات المتاحة",
              "offerings": [
                {
                  "name": "تأشيرة سياحية",
                  "validity": "30 يومًا",
                  "turnaround": "3 - 5 أيام"
                },
                {
                  "name": "تأشيرة زيارة",
                  "validity": "14 يومًا",
                  "turnaround": "2 - 4 أيام"
                }
              ],
              "contactNote": "يمكنك طلب هذه الخدمة عبر التواصل معنا مباشرة على واتساب.",
              "image": "/images/visa/oman-card.jpg",
              "imageAlt": "كورنيش مسقط في سلطنة عُمان",
              "landmarkImage": "https://images.pexels.com/photos/35738331/pexels-photo-35738331.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "مشهد علوي حقيقي لمدينة مسقط في عُمان",
              "requirementsImage": "/images/visa/oman-requirements.jpg",
              "requirementsImageAlt": "قلعة نزوى التاريخية في سلطنة عُمان",
              "servicesImage": "/images/visa/oman-services.jpg",
              "servicesImageAlt": "مَعْلَم حقيقي من نزوى في سلطنة عُمان",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "uae",
              "title": "الإمارات العربية المتحدة",
              "shortLabel": "الإمارات",
              "summary": "بنية أولية لعرض أنواع التأشيرات مع أوراق واضحة ومسار نظيف وسهل المتابعة.",
              "heroTag": "خيار متاح",
              "description": "صفحة مخصصة تشرح المتطلبات الأساسية وأنواع الخدمات المتاحة مع الحفاظ على عرض بصري مرتب وواضح.",
              "requirementsTitle": "المتطلبات الرسمية",
              "requirements": [
                "صورة جواز السفر",
                "صورة شخصية واضحة",
                "بيانات مقدم الطلب",
                "حجز أولي إذا لزم الأمر"
              ],
              "servicesTitle": "الخدمات المتاحة",
              "offerings": [
                {
                  "name": "تأشيرة سياحية",
                  "validity": "30 يومًا",
                  "turnaround": "2 - 4 أيام"
                },
                {
                  "name": "تمديد إقامة",
                  "validity": "بحسب الحالة",
                  "turnaround": "3 - 6 أيام"
                }
              ],
              "contactNote": "للحصول على التوجيه النهائي المناسب، تواصل معنا مباشرة عبر واتساب.",
              "image": "/images/visa/uae-card.jpg",
              "imageAlt": "خور دبي في الإمارات العربية المتحدة",
              "landmarkImage": "https://images.pexels.com/photos/32364200/pexels-photo-32364200.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "مشهد حقيقي لمدينة أبوظبي في الإمارات",
              "requirementsImage": "https://images.pexels.com/photos/33733376/pexels-photo-33733376.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "أبراج حديثة في أبوظبي ضمن مشهد حقيقي من الإمارات",
              "servicesImage": "/images/visa/uae-services.jpg",
              "servicesImageAlt": "أفق أبوظبي والكورنيش في الإمارات العربية المتحدة",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "saudi",
              "title": "المملكة العربية السعودية",
              "shortLabel": "السعودية",
              "summary": "صفحة فرعية مرتبة لعرض المتطلبات وأنواع الخدمات المتاحة داخل نفس الوجهة.",
              "heroTag": "خيار متاح",
              "description": "هذا المثال يوضح كيف يمكن عرض أكثر من خدمة داخل نفس الوجهة بشكل منظم وقابل للتوسع لاحقًا.",
              "requirementsTitle": "المتطلبات الرسمية",
              "requirements": [
                "جواز سفر ساري المفعول",
                "صورة شخصية",
                "معلومات المهنة أو العمل عند الحاجة",
                "بيانات التواصل"
              ],
              "servicesTitle": "الخدمات المتاحة",
              "offerings": [
                {
                  "name": "تأشيرة زيارة",
                  "validity": "30 يومًا",
                  "turnaround": "4 - 7 أيام"
                },
                {
                  "name": "تأشيرة أعمال",
                  "validity": "90 يومًا",
                  "turnaround": "5 - 8 أيام"
                }
              ],
              "contactNote": "راسلنا عبر واتساب لبدء الطلب أو لاختيار نوع الخدمة الأنسب.",
              "image": "/images/visa/saudi-card.png",
              "imageAlt": "مدائن صالح في العلا بالمملكة العربية السعودية",
              "landmarkImage": "/images/visa/saudi-landmark.jpg",
              "landmarkAlt": "البلدة القديمة في العلا بالمملكة العربية السعودية",
              "requirementsImage": "https://images.pexels.com/photos/20154910/pexels-photo-20154910.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "حصن تاريخي في المملكة العربية السعودية",
              "servicesImage": "https://images.pexels.com/photos/14773068/pexels-photo-14773068.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "تشكيلات صخرية حقيقية في العلا بالمملكة العربية السعودية",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            }
          ],
          "previewImage": "/images/visa/uae-card.jpg",
          "previewImageAlt": "مشهد حقيقي من الإمارات يرتبط بخدمات التأشيرات والإقامة",
          "previewImagePosition": "center center"
        },
        {
          "slug": "flight-booking",
          "icon": "plane",
          "title": "حجوزات الطيران",
          "eyebrow": "خيارات سفر",
          "summary": "نقدّم خيارات حجز الطيران بشكل واضح يسهّل المقارنة ويسرّع تأكيد الحجز.",
          "detail": "حوّلنا الحجز إلى مسار خدمة منظم: وجهات وأنواع حجز ثم تفاصيل تشغيلية تساعد العميل على اختيار المسار الأنسب بسرعة.",
          "highlights": [
            "مقارنة أوضح بين خيارات الحجز",
            "متابعة مباشرة حتى تأكيد الحجز",
            "رسائل مبنية على السرعة والوضوح"
          ],
          "cardCta": "عرض الخيارات",
          "heroTitle": "حجوزات طيران أسهل للمراجعة وأسرع في التأكيد",
          "heroSubtitle": "من الرحلات الفردية إلى حجوزات المجموعات، كل خيار معروض ضمن هيكل أوضح يساعد على القرار السريع والمتابعة السلسة.",
          "optionsTitle": "أنواع الحجز وخيارات المسارات",
          "optionsSubtitle": "افتح كل خيار لمعرفة ما نحتاجه للبدء، وما الذي نقدمه، وكيف تتم المتابعة من الاستفسار حتى التأكيد.",
          "items": [
            {
              "slug": "europe",
              "title": "مسارات أوروبا",
              "shortLabel": "أوروبا",
              "summary": "مثال لصفحة وجهة تنبثق من خدمة حجوزات الطيران.",
              "heroTag": "مسار شائع",
              "description": "يمكن استخدام هذه الصفحة لعرض ملاحظات الحجز أو الخيارات الخاصة بالمسار مع دعوة واضحة للتواصل.",
              "requirementsTitle": "ما نحتاجه للبدء",
              "requirements": [
                "تاريخ السفر التقريبي",
                "عدد المسافرين",
                "مدينة الانطلاق",
                "أي تفضيلات إضافية"
              ],
              "servicesTitle": "الخدمات المتاحة",
              "offerings": [
                {
                  "name": "حجز ذهاب وعودة",
                  "validity": "بحسب الحجز",
                  "turnaround": "خلال ساعات"
                },
                {
                  "name": "حجز متعدد المدن",
                  "validity": "بحسب المسار",
                  "turnaround": "خلال يوم واحد"
                }
              ],
              "contactNote": "راسلنا عبر واتساب لنرتب أفضل خيارات الطيران لوجهتك.",
              "image": "https://images.pexels.com/photos/20605409/pexels-photo-20605409.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "مشهد حقيقي لمدينة أوروبية من نافذة طائرة أثناء الرحلة",
              "landmarkImage": "https://images.pexels.com/photos/18754410/pexels-photo-18754410.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "إسطنبول من الجو خلال رحلة جوية باتجاه أوروبا",
              "requirementsImage": "https://images.pexels.com/photos/5096813/pexels-photo-5096813.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "جناح طائرة فوق جزيرة أوروبية في رحلة متوسطية",
              "servicesImage": "https://images.pexels.com/photos/15273869/pexels-photo-15273869.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "مشهد سفر جوي حقيقي يناسب حجوزات مسارات أوروبا",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "gulf",
              "title": "مسارات الخليج",
              "shortLabel": "الخليج",
              "summary": "خيار أولي للرحلات القصيرة أو المتكررة ضمن صفحة مخصصة وواضحة.",
              "heroTag": "مسار شائع",
              "description": "تصميم بسيط ومركز يسمح لكل خيار أن يحتفظ بتفاصيله دون تحميل الصفحة الرئيسية تفاصيل زائدة.",
              "requirementsTitle": "ما نحتاجه للبدء",
              "requirements": [
                "الوجهة المطلوبة",
                "تاريخ السفر",
                "عدد التذاكر",
                "درجة السفر"
              ],
              "servicesTitle": "الخدمات المتاحة",
              "offerings": [
                {
                  "name": "حجز اقتصادي",
                  "validity": "لكل تذكرة",
                  "turnaround": "خلال ساعات"
                },
                {
                  "name": "حجز درجة رجال الأعمال",
                  "validity": "لكل تذكرة",
                  "turnaround": "خلال ساعات"
                }
              ],
              "contactNote": "تواصل معنا عبر واتساب للحصول على أفضل خيارات رحلات الخليج.",
              "image": "https://images.pexels.com/photos/1441057/pexels-photo-1441057.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "أفق دبي الحقيقي بما يناسب مسارات رحلات الخليج",
              "landmarkImage": "https://images.pexels.com/photos/13398521/pexels-photo-13398521.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "مرسى دبي وأبراجها في مشهد حقيقي من الخليج",
              "requirementsImage": "https://images.pexels.com/photos/7168557/pexels-photo-7168557.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "واجهة بحرية حديثة في دبي تناسب رحلات الخليج القصيرة",
              "servicesImage": "https://images.pexels.com/photos/4348473/pexels-photo-4348473.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "مشهد غروب حقيقي لأفق دبي يخدم محتوى مسارات الخليج",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "group-booking",
              "title": "حجوزات المجموعات",
              "shortLabel": "المجموعات",
              "summary": "صفحة مخصصة للحزم أو الحجوزات ذات العدد الأكبر من المسافرين.",
              "heroTag": "خيار خاص",
              "description": "يمكن لهذه الصفحة أن تحتوي على منطق الحجز والملاحظات الخاصة بحجوزات المجموعات أو السفر الجماعي.",
              "requirementsTitle": "ما نحتاجه للبدء",
              "requirements": [
                "عدد المسافرين",
                "الوجهة",
                "فترة السفر",
                "نوع المجموعة"
              ],
              "servicesTitle": "الخدمات المتاحة",
              "offerings": [
                {
                  "name": "حجز مجموعات",
                  "validity": "لكل حجز",
                  "turnaround": "1 - 2 يوم"
                },
                {
                  "name": "تنسيق سفر للشركات",
                  "validity": "حسب الطلب",
                  "turnaround": "1 - 3 أيام"
                }
              ],
              "contactNote": "لحجوزات المجموعات، راسلنا مباشرة عبر واتساب.",
              "image": "https://images.pexels.com/photos/32176066/pexels-photo-32176066.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "ركاب داخل صالة مطار حديثة تناسب حجوزات المجموعات",
              "landmarkImage": "https://images.pexels.com/photos/6544060/pexels-photo-6544060.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "صالة مطار مزدحمة حقيقية تناسب تنسيق سفر المجموعات",
              "requirementsImage": "https://images.pexels.com/photos/12940671/pexels-photo-12940671.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "مسافرون ينتظرون في صالة مطار حديثة ضمن رحلة جماعية",
              "servicesImage": "https://images.pexels.com/photos/20325709/pexels-photo-20325709.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "أمتعة سفر داخل مطار حديث تخدم محتوى حجوزات المجموعات",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            }
          ],
          "previewImage": "/images/hero/flight-booking-hero.jpg",
          "previewImageAlt": "طائرة حديثة تمثل حجوزات طيران منظمة ومؤكدة",
          "previewImagePosition": "center center"
        },
        {
          "slug": "study-abroad",
          "icon": "globe",
          "title": "الدراسة في الخارج",
          "eyebrow": "مسار أوضح",
          "summary": "رتبنا خدمات الدراسة في الخارج حسب الدولة أو البرنامج لتفهم المسار المناسب لك بسهولة أكبر.",
          "detail": "هذه الخدمة تحتاج إلى وضوح وإقناع معًا، لذلك فصلنا كل دولة أو مسار دراسي في صفحة مستقلة تساعد العميل على فهم الطريق من البداية.",
          "highlights": [
            "فصل واضح حسب الدولة أو البرنامج",
            "فهم أسهل قبل بدء التقديم",
            "بنية قابلة للتوسع مستقبلًا"
          ],
          "cardCta": "عرض البرامج",
          "heroTitle": "الدراسة في الخارج بمسار أوضح من أول استفسار",
          "heroSubtitle": "ننظم الوجهات والمسارات التعليمية بحيث يرى العميل الخيار الأنسب مبكرًا، ثم ينتقل إلى المتطلبات والخطوات التالية بثقة.",
          "optionsTitle": "الوجهات والبرامج المتاحة",
          "optionsSubtitle": "كل مسار يشرح المتطلبات الأولية والدعم الذي نقدمه والطريق العملي المتوقع بعد ذلك.",
          "items": [
            {
              "slug": "turkiye",
              "title": "الدراسة في تركيا",
              "shortLabel": "تركيا",
              "summary": "مثال أولي لصفحة برنامج أو دولة داخل خدمة الدراسة.",
              "heroTag": "خيار دراسي",
              "description": "يمكن لهذه الصفحة أن تعرض ملخصًا سريعًا للمسار والمتطلبات الأولية والخدمات التي نقدمها حول هذا الخيار.",
              "requirementsTitle": "المتطلبات الأولية",
              "requirements": [
                "صورة جواز السفر",
                "آخر شهادة دراسية",
                "وسيلة تواصل موثوقة",
                "تفضيل مبدئي للتخصص"
              ],
              "servicesTitle": "الخدمات المتاحة",
              "offerings": [
                {
                  "name": "استشارة أولية",
                  "validity": "مرة واحدة",
                  "turnaround": "خلال يوم واحد"
                },
                {
                  "name": "متابعة ملف التقديم",
                  "validity": "لكل برنامج",
                  "turnaround": "بحسب الحالة"
                }
              ],
              "contactNote": "راسلنا عبر واتساب لنبدأ بالخيار الأنسب لك.",
              "image": "https://images.pexels.com/photos/15247433/pexels-photo-15247433.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "مبنى جامعي حقيقي في إسطنبول ضمن مسار الدراسة في تركيا",
              "landmarkImage": "https://images.pexels.com/photos/20483641/pexels-photo-20483641.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "بوابة جامعة إسطنبول في مشهد حقيقي من تركيا",
              "requirementsImage": "https://images.pexels.com/photos/8384827/pexels-photo-8384827.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "واجهة جامعة إسطنبول التاريخية بما يناسب متطلبات الدراسة",
              "servicesImage": "https://images.pexels.com/photos/25389979/pexels-photo-25389979.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "مشهد جامعي حقيقي من إسطنبول يخدم محتوى الدراسة في تركيا",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "uk",
              "title": "الدراسة في بريطانيا",
              "shortLabel": "بريطانيا",
              "summary": "صفحة أولية لوجهة دراسية ثانية مع نفس البنية الواضحة والمتماسكة.",
              "heroTag": "خيار دراسي",
              "description": "وجود صفحة مستقلة لكل وجهة دراسية يجعل استيعاب المحتوى أسهل ويمنع تداخل المعلومات على المستخدم.",
              "requirementsTitle": "المتطلبات الأولية",
              "requirements": [
                "جواز سفر",
                "آخر شهادة",
                "مستوى اللغة إن وجد",
                "بيانات التواصل"
              ],
              "servicesTitle": "الخدمات المتاحة",
              "offerings": [
                {
                  "name": "تقييم أولي",
                  "validity": "مرة واحدة",
                  "turnaround": "خلال يوم واحد"
                },
                {
                  "name": "تهيئة ملف مبدئي",
                  "validity": "لكل وجهة",
                  "turnaround": "2 - 5 أيام"
                }
              ],
              "contactNote": "راسلنا عبر واتساب لتحديد أول خطوة مناسبة لك.",
              "image": "https://images.pexels.com/photos/14753324/pexels-photo-14753324.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "مبنى أكاديمي كلاسيكي يناسب محتوى الدراسة في بريطانيا",
              "landmarkImage": "https://images.pexels.com/photos/11796159/pexels-photo-11796159.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "مشهد حقيقي من لندن مع بيغ بن يعبّر عن الدراسة في بريطانيا",
              "requirementsImage": "https://images.pexels.com/photos/11826754/pexels-photo-11826754.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "واجهة مؤسسة تعليمية كلاسيكية في لندن تناسب المتطلبات الأولية",
              "servicesImage": "https://images.pexels.com/photos/16230669/pexels-photo-16230669.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "مشهد حضري حقيقي من لندن يخدم محتوى الدراسة في بريطانيا",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "malaysia",
              "title": "الدراسة في ماليزيا",
              "shortLabel": "ماليزيا",
              "summary": "مثال إضافي يوضح كيف يمكن إضافة دول جديدة ضمن نفس النظام بسهولة.",
              "heroTag": "خيار دراسي",
              "description": "يمكن إضافة دول جديدة أو صفحات برامج جديدة من خلال البيانات فقط من دون تعديل نظام الواجهة.",
              "requirementsTitle": "المتطلبات الأولية",
              "requirements": [
                "صورة جواز السفر",
                "شهادة دراسية",
                "التخصص المطلوب",
                "بيانات التواصل"
              ],
              "servicesTitle": "الخدمات المتاحة",
              "offerings": [
                {
                  "name": "استشارة أولية",
                  "validity": "مرة واحدة",
                  "turnaround": "خلال يوم واحد"
                },
                {
                  "name": "تنظيم الملف",
                  "validity": "بحسب الحالة",
                  "turnaround": "2 - 4 أيام"
                }
              ],
              "contactNote": "تواصل معنا عبر واتساب وسنوضح لك المسار الأنسب.",
              "image": "https://images.pexels.com/photos/33196113/pexels-photo-33196113.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "أفق كوالالمبور الحقيقي بما يناسب الدراسة في ماليزيا",
              "landmarkImage": "https://images.pexels.com/photos/32644036/pexels-photo-32644036.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "مشهد حقيقي من كوالالمبور مع الأبراج الشهيرة في ماليزيا",
              "requirementsImage": "https://images.pexels.com/photos/30067522/pexels-photo-30067522.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "أفق كوالالمبور عند الغروب بما يناسب متطلبات الدراسة في ماليزيا",
              "servicesImage": "https://images.pexels.com/photos/3724019/pexels-photo-3724019.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "مشهد حقيقي من ماليزيا يخدم محتوى خدمات الدراسة بالخارج",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            }
          ],
          "previewImage": "/images/hero/study-abroad-hero.jpg",
          "previewImageAlt": "طلاب دوليون في حرم جامعي حديث",
          "previewImagePosition": "center center"
        },
        {
          "slug": "language-exams",
          "icon": "star",
          "title": "حجوزات اختبارات اللغة",
          "eyebrow": "بنية مباشرة",
          "summary": "حجوزات اختبارات اللغة مع معلومات أوضح وخطوات مباشرة تساعدك على تثبيت الحجز بسرعة.",
          "detail": "بدل عرض الاختبارات كعناصر متشابهة ومسطحة، أعطينا كل اختبار صفحة مستقلة بمتطلبات أوضح ومنطق حجز أكثر وضوحًا ودعم متابعة مباشر.",
          "highlights": [
            "صفحات مركزة لكل اختبار",
            "معلومات عملية قبل الحجز",
            "بنية جاهزة لمراكز وتواريخ جديدة"
          ],
          "cardCta": "عرض الخيارات",
          "heroTitle": "حجوزات اختبارات اللغة برسائل أوضح وصور مستعادة",
          "heroSubtitle": "كل اختبار يفتح على صفحة مركزة تساعد العميل على فهم المطلوب وما يمكن ترتيبه وكيف يبدأ بسرعة.",
          "optionsTitle": "الاختبارات المتاحة للحجز",
          "optionsSubtitle": "اختر الاختبار الذي تحتاجه لمراجعة المعلومات المطلوبة ودعم الحجز والخطوة التالية التي يمكننا تنفيذها لك.",
          "items": [
            {
              "slug": "ielts",
              "title": "حجز IELTS",
              "shortLabel": "IELTS",
              "summary": "صفحة أولية لحجز الاختبار بواجهة أنظف ومسار أوضح.",
              "heroTag": "خيار متاح",
              "description": "توضح هذه الصفحة ما نحتاجه من العميل وما الذي نقدمه ضمن خدمة الحجز.",
              "requirementsTitle": "المعلومات المطلوبة",
              "requirements": [
                "الاسم مطابقًا تمامًا للجواز",
                "صورة جواز السفر",
                "المدينة أو المركز المفضل",
                "تاريخ تقريبي"
              ],
              "servicesTitle": "الخدمات المتاحة",
              "offerings": [
                {
                  "name": "حجز الاختبار",
                  "validity": "بحسب الجلسة",
                  "turnaround": "خلال يوم واحد"
                },
                {
                  "name": "تعديل أو متابعة",
                  "validity": "بحسب السياسة",
                  "turnaround": "بحسب الحالة"
                }
              ],
              "contactNote": "للحجز أو للاستفسار، تواصل معنا عبر واتساب.",
              "image": "https://images.pexels.com/photos/6684255/pexels-photo-6684255.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "مشهد حقيقي لطالب يقدّم اختبارًا كتابيًا يناسب IELTS",
              "landmarkImage": "https://images.pexels.com/photos/6549856/pexels-photo-6549856.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "تحضير أكاديمي حقيقي لاختبار IELTS على مكتب دراسة",
              "requirementsImage": "https://images.pexels.com/photos/6684255/pexels-photo-6684255.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "ورقة اختبار حقيقية تناسب متطلبات حجز IELTS",
              "servicesImage": "https://images.pexels.com/photos/6549856/pexels-photo-6549856.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "مشهد دراسة حقيقي يخدم محتوى حجز IELTS",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "toefl",
              "title": "حجز TOEFL",
              "shortLabel": "TOEFL",
              "summary": "مثال ثانٍ داخل نفس بنية الخدمة مع عرض ثابت وواضح.",
              "heroTag": "خيار متاح",
              "description": "نفس التصميم يدعم أكثر من نوع اختبار بشكل مستقر وواضح للمستخدم.",
              "requirementsTitle": "المعلومات المطلوبة",
              "requirements": [
                "الاسم المطابق للجواز",
                "صورة جواز السفر",
                "الدولة أو المركز المفضل",
                "التاريخ المتوقع"
              ],
              "servicesTitle": "الخدمات المتاحة",
              "offerings": [
                {
                  "name": "حجز الاختبار",
                  "validity": "بحسب الجلسة",
                  "turnaround": "خلال يوم واحد"
                },
                {
                  "name": "متابعة الحجز",
                  "validity": "بحسب الحالة",
                  "turnaround": "خلال يوم واحد"
                }
              ],
              "contactNote": "راسلنا عبر واتساب لترتيب الحجز المناسب.",
              "image": "https://images.pexels.com/photos/6549856/pexels-photo-6549856.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "تحضير أكاديمي رقمي حقيقي يناسب اختبار TOEFL",
              "landmarkImage": "https://images.pexels.com/photos/28224333/pexels-photo-28224333.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "مكتب كمبيوتر وسماعات يناسب بيئة اختبار TOEFL",
              "requirementsImage": "https://images.pexels.com/photos/6549856/pexels-photo-6549856.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "مكتب دراسة ومراجع حقيقية تلائم متطلبات TOEFL",
              "servicesImage": "https://images.pexels.com/photos/28224333/pexels-photo-28224333.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "بيئة رقمية حقيقية تخدم محتوى حجز TOEFL",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "pte",
              "title": "حجز PTE",
              "shortLabel": "PTE",
              "summary": "مثال ثالث يثبت مرونة نفس المسار مع اختبارات إضافية.",
              "heroTag": "خيار متاح",
              "description": "يمكن إضافة أي اختبار جديد أو مركز جديد من خلال البيانات فقط دون تغيير بنية الصفحة.",
              "requirementsTitle": "المعلومات المطلوبة",
              "requirements": [
                "الاسم الكامل",
                "صورة جواز السفر",
                "تاريخ تقريبي",
                "الدولة أو مركز الاختبار"
              ],
              "servicesTitle": "الخدمات المتاحة",
              "offerings": [
                {
                  "name": "حجز الاختبار",
                  "validity": "بحسب المركز",
                  "turnaround": "خلال يوم واحد"
                },
                {
                  "name": "إعادة جدولة الحجز",
                  "validity": "بحسب السياسة",
                  "turnaround": "بحسب الحالة"
                }
              ],
              "contactNote": "لبدء الإجراء، تواصل معنا مباشرة عبر واتساب.",
              "image": "https://images.pexels.com/photos/28224333/pexels-photo-28224333.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "سماعات وكمبيوتر في مشهد حقيقي يناسب اختبار PTE",
              "landmarkImage": "https://images.pexels.com/photos/18966473/pexels-photo-18966473.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "استخدام سماعة أمام شاشة بما يناسب طبيعة اختبار PTE",
              "requirementsImage": "https://images.pexels.com/photos/28224333/pexels-photo-28224333.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "إعداد تقني حقيقي يناسب متطلبات حجز PTE",
              "servicesImage": "https://images.pexels.com/photos/18966473/pexels-photo-18966473.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "مشهد رقمي حقيقي يخدم محتوى حجز اختبار PTE",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            }
          ],
          "previewImage": "/images/hero/goethe-exam.jpg",
          "previewImageAlt": "مواد تحضير لاختبار لغة وشهادة أكاديمية",
          "previewImagePosition": "center center"
        }
      ]
    },
    "common": {
      "homeLabel": "الرئيسية",
      "servicesLabel": "الخدمات",
      "serviceDetailsLabel": "تفاصيل الخدمة",
      "optionsLabel": "الخيارات المتاحة",
      "exploreLabel": "استعراض",
      "backToServices": "العودة إلى الخدمات",
      "availableItems": "الخيارات المتاحة",
      "requirementsLabel": "المتطلبات",
      "whatsAppLabel": "اطلب عبر واتساب",
      "previousLabel": "السابق",
      "nextLabel": "التالي",
      "validityLabel": "المدة",
      "turnaroundLabel": "مدة الإنجاز",
      "returnToService": "العودة إلى الخدمة",
      "customerVoicesTitle": "آراء العملاء",
      "customerVoices": [
        {
          "name": "محمد العلي",
          "text": "المسار كان واضحًا من أول تواصل، وكل خطوة كانت مرتبة وسهلة المتابعة.",
          "gender": "male"
        },
        {
          "name": "نور أحمد",
          "text": "التعامل كان سريعًا ومريحًا، والمعلومات وصلت بشكل واضح بدون أي تشتيت.",
          "gender": "female"
        }
      ]
    }
  },
  "en": {
    "listing": {
      "label": "Services",
      "title": "Travel services built to guide decisions and speed up action",
      "subtitle": "From visas to flights, study routes, and language exams, each service is presented with clearer structure, stronger messaging, and visuals that match the offer.",
      "intro": "Instead of stacking every detail into one long page, we separate each service into a cleaner path: the service, its options, then the exact requirements needed to move forward.",
      "stats": [
        {
          "value": "4",
          "label": "Core services"
        },
        {
          "value": "12",
          "label": "Initial options"
        },
        {
          "value": "24/7",
          "label": "WhatsApp access"
        }
      ],
      "spotlightTitle": "Clear services, stronger positioning, better flow",
      "spotlightText": "Every card leads into a focused service page, and every service page opens to real options with more persuasive copy and restored imagery instead of empty or broken layouts.",
      "ctaTitle": "Start with the right service immediately",
      "ctaSubtitle": "Message us on WhatsApp and we will guide you straight to the service, destination, or booking path that fits your request best.",
      "ctaBtn": "Contact on WhatsApp",
      "whatsapp": "971501234567",
      "services": [
        {
          "slug": "visa-residency",
          "icon": "passport",
          "title": "Visas & Residency",
          "eyebrow": "Structured service",
          "summary": "Visa and residency services organized by destination, with a clearer path from choice to paperwork and direct follow-up.",
          "detail": "This service is structured to help clients understand available destinations quickly, review the right documents early, and move forward with fewer questions and less friction.",
          "highlights": [
            "Clear destination-based structure",
            "Focused details for each process",
            "Direct follow-up to keep requests moving"
          ],
          "cardCta": "View destinations",
          "heroTitle": "Visas and residency, presented with more clarity and confidence",
          "heroSubtitle": "We organize destinations, requirements, and service paths in a way that helps clients decide faster and start the right process with less confusion.",
          "optionsTitle": "Available destinations and service paths",
          "optionsSubtitle": "Open each destination to review requirements, validity, turnaround, and the related support we can arrange for your case.",
          "items": [
            {
              "slug": "oman",
              "title": "Oman",
              "shortLabel": "Oman",
              "summary": "A first example of a destination page with requirements and service options.",
              "heroTag": "Available option",
              "description": "This is a starter layout showing how a destination page can hold a short overview, required documents, and available services.",
              "requirementsTitle": "Official requirements",
              "requirements": [
                "Valid passport",
                "Recent personal photo",
                "ID or residency copy when needed",
                "Travel details or initial booking information"
              ],
              "servicesTitle": "Available services",
              "offerings": [
                {
                  "name": "Tourist visa",
                  "validity": "30 days",
                  "turnaround": "3 - 5 days"
                },
                {
                  "name": "Visit visa",
                  "validity": "14 days",
                  "turnaround": "2 - 4 days"
                }
              ],
              "contactNote": "You can request this service by contacting us directly on WhatsApp.",
              "image": "/images/visa/oman-card.jpg",
              "imageAlt": "Muscat Corniche in Oman",
              "landmarkImage": "https://images.pexels.com/photos/35738331/pexels-photo-35738331.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "Real aerial view of Muscat, Oman",
              "requirementsImage": "/images/visa/oman-requirements.jpg",
              "requirementsImageAlt": "Historic Nizwa Fort in Oman",
              "servicesImage": "/images/visa/oman-services.jpg",
              "servicesImageAlt": "Real landmark view from Nizwa, Oman",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "uae",
              "title": "United Arab Emirates",
              "shortLabel": "UAE",
              "summary": "An initial structure for visa types with clear documents and a clean path.",
              "heroTag": "Available option",
              "description": "A dedicated page explaining core requirements and available service types, while keeping the content visually clean.",
              "requirementsTitle": "Official requirements",
              "requirements": [
                "Passport copy",
                "Clear personal photo",
                "Applicant details",
                "Initial booking if required"
              ],
              "servicesTitle": "Available services",
              "offerings": [
                {
                  "name": "Tourist visa",
                  "validity": "30 days",
                  "turnaround": "2 - 4 days"
                },
                {
                  "name": "Residency extension",
                  "validity": "Case-based",
                  "turnaround": "3 - 6 days"
                }
              ],
              "contactNote": "For final guidance, contact us directly on WhatsApp.",
              "image": "/images/visa/uae-card.jpg",
              "imageAlt": "Dubai Creek in the United Arab Emirates",
              "landmarkImage": "https://images.pexels.com/photos/32364200/pexels-photo-32364200.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "Real Abu Dhabi cityscape in the UAE",
              "requirementsImage": "https://images.pexels.com/photos/33733376/pexels-photo-33733376.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "Modern towers in Abu Dhabi, UAE",
              "servicesImage": "/images/visa/uae-services.jpg",
              "servicesImageAlt": "Abu Dhabi skyline and corniche in the UAE",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "saudi",
              "title": "Saudi Arabia",
              "shortLabel": "Saudi",
              "summary": "A structured sub-page for requirements and available service types.",
              "heroTag": "Available option",
              "description": "This example shows how multiple offerings inside one destination can stay organized and expandable.",
              "requirementsTitle": "Official requirements",
              "requirements": [
                "Valid passport",
                "Personal photo",
                "Job information when needed",
                "Contact details"
              ],
              "servicesTitle": "Available services",
              "offerings": [
                {
                  "name": "Visit visa",
                  "validity": "30 days",
                  "turnaround": "4 - 7 days"
                },
                {
                  "name": "Business visa",
                  "validity": "90 days",
                  "turnaround": "5 - 8 days"
                }
              ],
              "contactNote": "Message us on WhatsApp to start or to choose the right service type.",
              "image": "/images/visa/saudi-card.png",
              "imageAlt": "Hegra in AlUla, Saudi Arabia",
              "landmarkImage": "/images/visa/saudi-landmark.jpg",
              "landmarkAlt": "Old Town in AlUla, Saudi Arabia",
              "requirementsImage": "https://images.pexels.com/photos/20154910/pexels-photo-20154910.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "Historic fort in Saudi Arabia",
              "servicesImage": "https://images.pexels.com/photos/14773068/pexels-photo-14773068.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "Real rock formations in AlUla, Saudi Arabia",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            }
          ],
          "previewImage": "/images/visa/uae-card.jpg",
          "previewImageAlt": "Real UAE scene related to visa and residency services",
          "previewImagePosition": "center center"
        },
        {
          "slug": "flight-booking",
          "icon": "plane",
          "title": "Flight Bookings",
          "eyebrow": "Travel options",
          "summary": "Flight booking options presented in a cleaner, more persuasive way that makes comparison easier and confirmation faster.",
          "detail": "We turn booking into a structured service flow: destinations, booking types, then the operational details that help the client choose the best route quickly.",
          "highlights": [
            "Cleaner comparison across booking options",
            "Direct follow-up until confirmation",
            "Messaging built around speed and clarity"
          ],
          "cardCta": "View options",
          "heroTitle": "Flight bookings that are easier to review and faster to confirm",
          "heroSubtitle": "From individual routes to group bookings, every option is presented in a clearer structure that supports faster decisions and smoother follow-up.",
          "optionsTitle": "Booking types and route options",
          "optionsSubtitle": "Open each option to see what we need to begin, what we provide, and how the booking path is handled from inquiry to confirmation.",
          "items": [
            {
              "slug": "europe",
              "title": "Europe Routes",
              "shortLabel": "Europe",
              "summary": "An example destination page branching from the flight service.",
              "heroTag": "Popular route",
              "description": "This page can be used to show booking notes or route-specific options with a clear CTA.",
              "requirementsTitle": "What we need to begin",
              "requirements": [
                "Approximate travel date",
                "Number of travelers",
                "Departure city",
                "Any additional preferences"
              ],
              "servicesTitle": "Available services",
              "offerings": [
                {
                  "name": "Round-trip booking",
                  "validity": "As booked",
                  "turnaround": "Within hours"
                },
                {
                  "name": "Multi-city booking",
                  "validity": "Per route",
                  "turnaround": "Within one day"
                }
              ],
              "contactNote": "Message us on WhatsApp to arrange the best flight options for your destination.",
              "image": "https://images.pexels.com/photos/20605409/pexels-photo-20605409.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "Real European city view seen from an aircraft window",
              "landmarkImage": "https://images.pexels.com/photos/18754410/pexels-photo-18754410.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "Aerial flight view over Istanbul on a Europe-bound route",
              "requirementsImage": "https://images.pexels.com/photos/5096813/pexels-photo-5096813.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "Airplane wing above a European island on a Mediterranean route",
              "servicesImage": "https://images.pexels.com/photos/15273869/pexels-photo-15273869.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "Real in-flight travel scene suitable for Europe booking routes",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "gulf",
              "title": "Gulf Routes",
              "shortLabel": "Gulf",
              "summary": "A starter option for short-haul or repeated travel in a dedicated page.",
              "heroTag": "Popular route",
              "description": "A simple, focused layout that lets each option hold its own specifics without overloading the main page.",
              "requirementsTitle": "What we need to begin",
              "requirements": [
                "Target destination",
                "Travel date",
                "Number of tickets",
                "Travel class"
              ],
              "servicesTitle": "Available services",
              "offerings": [
                {
                  "name": "Economy booking",
                  "validity": "Per ticket",
                  "turnaround": "Within hours"
                },
                {
                  "name": "Business booking",
                  "validity": "Per ticket",
                  "turnaround": "Within hours"
                }
              ],
              "contactNote": "Contact us on WhatsApp for the best Gulf flight options.",
              "image": "https://images.pexels.com/photos/1441057/pexels-photo-1441057.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "Real Dubai skyline suited to Gulf flight routes",
              "landmarkImage": "https://images.pexels.com/photos/13398521/pexels-photo-13398521.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "Dubai Marina skyline in a real Gulf city scene",
              "requirementsImage": "https://images.pexels.com/photos/7168557/pexels-photo-7168557.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "Modern Dubai waterfront matching short-haul Gulf routes",
              "servicesImage": "https://images.pexels.com/photos/4348473/pexels-photo-4348473.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "Real sunset skyline of Dubai for Gulf route content",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "group-booking",
              "title": "Group Bookings",
              "shortLabel": "Group",
              "summary": "A dedicated page for packages or larger party bookings.",
              "heroTag": "Special option",
              "description": "This page can hold the logic and notes specific to group or multi-passenger bookings.",
              "requirementsTitle": "What we need to begin",
              "requirements": [
                "Number of travelers",
                "Destination",
                "Travel window",
                "Group type"
              ],
              "servicesTitle": "Available services",
              "offerings": [
                {
                  "name": "Group booking",
                  "validity": "Per booking",
                  "turnaround": "1 - 2 days"
                },
                {
                  "name": "Corporate travel setup",
                  "validity": "Per request",
                  "turnaround": "1 - 3 days"
                }
              ],
              "contactNote": "For group bookings, message us directly on WhatsApp.",
              "image": "https://images.pexels.com/photos/32176066/pexels-photo-32176066.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "Passengers inside a modern airport terminal suited to group bookings",
              "landmarkImage": "https://images.pexels.com/photos/6544060/pexels-photo-6544060.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "A busy airport terminal matching coordinated group travel",
              "requirementsImage": "https://images.pexels.com/photos/12940671/pexels-photo-12940671.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "Travelers waiting in a modern airport terminal for a shared trip",
              "servicesImage": "https://images.pexels.com/photos/20325709/pexels-photo-20325709.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "Airport luggage scene supporting group booking content",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            }
          ],
          "previewImage": "/images/hero/flight-booking-hero.jpg",
          "previewImageAlt": "Modern aircraft representing organized and confirmed flight bookings",
          "previewImagePosition": "center center"
        },
        {
          "slug": "study-abroad",
          "icon": "globe",
          "title": "Study Abroad",
          "eyebrow": "Clearer path",
          "summary": "Study-abroad routes organized by destination or program, giving the service a cleaner structure and more scalable presentation.",
          "detail": "This service needs both clarity and persuasion, so each country or route is separated into its own page to help the client understand the path from the start.",
          "highlights": [
            "Clear separation by country or program",
            "Easier client understanding before applying",
            "Scalable structure for future expansion"
          ],
          "cardCta": "View programs",
          "heroTitle": "Study abroad, with a clearer path from first inquiry",
          "heroSubtitle": "We structure destinations and education routes to help clients see the right fit earlier, then move into requirements and next steps with confidence.",
          "optionsTitle": "Available destinations and programs",
          "optionsSubtitle": "Each route explains the initial requirements, the support we provide, and the practical path the client can expect next.",
          "items": [
            {
              "slug": "turkiye",
              "title": "Study in Turkey",
              "shortLabel": "Turkey",
              "summary": "A first example of a program or country page inside the study service.",
              "heroTag": "Study option",
              "description": "This page can show a short route summary, initial requirements, and the services we provide around that path.",
              "requirementsTitle": "Initial requirements",
              "requirements": [
                "Passport copy",
                "Latest academic certificate",
                "Reliable contact method",
                "Initial specialization preference"
              ],
              "servicesTitle": "Available services",
              "offerings": [
                {
                  "name": "Initial consultation",
                  "validity": "One-time",
                  "turnaround": "Within one day"
                },
                {
                  "name": "Application file follow-up",
                  "validity": "Per program",
                  "turnaround": "Case-based"
                }
              ],
              "contactNote": "Message us on WhatsApp to begin with the best-fit option.",
              "image": "https://images.pexels.com/photos/15247433/pexels-photo-15247433.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "Real university building in Istanbul for study in Turkey",
              "landmarkImage": "https://images.pexels.com/photos/20483641/pexels-photo-20483641.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "Istanbul University gate in a real Turkey study route scene",
              "requirementsImage": "https://images.pexels.com/photos/8384827/pexels-photo-8384827.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "Historic Istanbul University facade matching study requirements",
              "servicesImage": "https://images.pexels.com/photos/25389979/pexels-photo-25389979.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "Real campus scene from Istanbul supporting study in Turkey content",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "uk",
              "title": "Study in Britain",
              "shortLabel": "Britain",
              "summary": "A starter page for another education destination with a consistent structure.",
              "heroTag": "Study option",
              "description": "A dedicated page for a study destination makes it easier to hold its own content without confusing the user.",
              "requirementsTitle": "Initial requirements",
              "requirements": [
                "Passport",
                "Latest certificate",
                "Language level if available",
                "Contact details"
              ],
              "servicesTitle": "Available services",
              "offerings": [
                {
                  "name": "Initial evaluation",
                  "validity": "One-time",
                  "turnaround": "Within one day"
                },
                {
                  "name": "Starter file setup",
                  "validity": "Per destination",
                  "turnaround": "2 - 5 days"
                }
              ],
              "contactNote": "Message us on WhatsApp to identify the right first step.",
              "image": "https://images.pexels.com/photos/14753324/pexels-photo-14753324.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "Classic academic building suited to study in Britain",
              "landmarkImage": "https://images.pexels.com/photos/11796159/pexels-photo-11796159.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "Real London scene with Big Ben representing study in Britain",
              "requirementsImage": "https://images.pexels.com/photos/11826754/pexels-photo-11826754.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "Classic educational facade in London matching initial requirements",
              "servicesImage": "https://images.pexels.com/photos/16230669/pexels-photo-16230669.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "Real London city scene supporting study in Britain content",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "malaysia",
              "title": "Study in Malaysia",
              "shortLabel": "Malaysia",
              "summary": "Another example showing how new countries can slot into the same system.",
              "heroTag": "Study option",
              "description": "New countries or program pages can be added through data only, without changing the layout system.",
              "requirementsTitle": "Initial requirements",
              "requirements": [
                "Passport copy",
                "Academic certificate",
                "Field of interest",
                "Contact details"
              ],
              "servicesTitle": "Available services",
              "offerings": [
                {
                  "name": "Initial consultation",
                  "validity": "One-time",
                  "turnaround": "Within one day"
                },
                {
                  "name": "File structuring",
                  "validity": "Case-based",
                  "turnaround": "2 - 4 days"
                }
              ],
              "contactNote": "Contact us on WhatsApp and we will clarify the right route for you.",
              "image": "https://images.pexels.com/photos/33196113/pexels-photo-33196113.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "Real Kuala Lumpur skyline suited to study in Malaysia",
              "landmarkImage": "https://images.pexels.com/photos/32644036/pexels-photo-32644036.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "Real Kuala Lumpur skyline with iconic towers in Malaysia",
              "requirementsImage": "https://images.pexels.com/photos/30067522/pexels-photo-30067522.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "Kuala Lumpur skyline at sunset matching study requirements in Malaysia",
              "servicesImage": "https://images.pexels.com/photos/3724019/pexels-photo-3724019.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "Real Malaysia city scene supporting study abroad service content",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            }
          ],
          "previewImage": "/images/hero/study-abroad-hero.jpg",
          "previewImageAlt": "International students on a modern university campus",
          "previewImagePosition": "center center"
        },
        {
          "slug": "language-exams",
          "icon": "star",
          "title": "Language Exam Bookings",
          "eyebrow": "Direct structure",
          "summary": "Language exam bookings with clearer positioning, stronger visuals, and practical information clients need before they book.",
          "detail": "Instead of presenting exams as flat repetitive entries, we give each test its own page with clearer requirements, booking logic, and follow-up support.",
          "highlights": [
            "Focused pages for each exam",
            "Practical pre-booking information",
            "Structure ready for future centers and dates"
          ],
          "cardCta": "View options",
          "heroTitle": "Language exam bookings with clearer messaging and restored visuals",
          "heroSubtitle": "Each exam opens into a focused page that helps the client understand what is needed, what can be arranged, and how to move forward quickly.",
          "optionsTitle": "Available exams for booking",
          "optionsSubtitle": "Choose the exam you need to review the required information, booking support, and the next step we can handle for you.",
          "items": [
            {
              "slug": "ielts",
              "title": "IELTS Booking",
              "shortLabel": "IELTS",
              "summary": "A first draft page for exam booking with a cleaner interface.",
              "heroTag": "Available option",
              "description": "This page shows what we need from the client and what we provide inside the booking service.",
              "requirementsTitle": "Required information",
              "requirements": [
                "Name exactly as in passport",
                "Passport copy",
                "Preferred city or center",
                "Approximate date"
              ],
              "servicesTitle": "Available services",
              "offerings": [
                {
                  "name": "Exam booking",
                  "validity": "By session",
                  "turnaround": "Within one day"
                },
                {
                  "name": "Adjustment or follow-up",
                  "validity": "By policy",
                  "turnaround": "Case-based"
                }
              ],
              "contactNote": "For booking or questions, contact us on WhatsApp.",
              "image": "https://images.pexels.com/photos/6684255/pexels-photo-6684255.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "Real written exam scene suited to IELTS booking",
              "landmarkImage": "https://images.pexels.com/photos/6549856/pexels-photo-6549856.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "Real study desk setup supporting IELTS preparation",
              "requirementsImage": "https://images.pexels.com/photos/6684255/pexels-photo-6684255.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "Real exam paper scene matching IELTS booking requirements",
              "servicesImage": "https://images.pexels.com/photos/6549856/pexels-photo-6549856.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "Real study setup supporting IELTS booking content",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "toefl",
              "title": "TOEFL Booking",
              "shortLabel": "TOEFL",
              "summary": "A second sub-page example inside the same service structure.",
              "heroTag": "Available option",
              "description": "The same layout can support multiple exam types in a stable, clear way.",
              "requirementsTitle": "Required information",
              "requirements": [
                "Passport-matching name",
                "Passport copy",
                "Preferred country or center",
                "Expected date"
              ],
              "servicesTitle": "Available services",
              "offerings": [
                {
                  "name": "Exam booking",
                  "validity": "By session",
                  "turnaround": "Within one day"
                },
                {
                  "name": "Booking follow-up",
                  "validity": "Case-based",
                  "turnaround": "Within one day"
                }
              ],
              "contactNote": "Message us on WhatsApp to arrange the right booking.",
              "image": "https://images.pexels.com/photos/6549856/pexels-photo-6549856.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "Real academic digital study setup suited to TOEFL",
              "landmarkImage": "https://images.pexels.com/photos/28224333/pexels-photo-28224333.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "Computer desk and headphones matching TOEFL exam context",
              "requirementsImage": "https://images.pexels.com/photos/6549856/pexels-photo-6549856.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "Real desk and reference materials matching TOEFL requirements",
              "servicesImage": "https://images.pexels.com/photos/28224333/pexels-photo-28224333.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "Real digital setup supporting TOEFL booking content",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            },
            {
              "slug": "pte",
              "title": "PTE Booking",
              "shortLabel": "PTE",
              "summary": "A third example proving the flexibility of the same route pattern.",
              "heroTag": "Available option",
              "description": "Any new exam or center can be added via data only, without changing the page structure.",
              "requirementsTitle": "Required information",
              "requirements": [
                "Full name",
                "Passport copy",
                "Approximate date",
                "Country or test center"
              ],
              "servicesTitle": "Available services",
              "offerings": [
                {
                  "name": "Exam booking",
                  "validity": "By center",
                  "turnaround": "Within one day"
                },
                {
                  "name": "Booking rescheduling",
                  "validity": "By policy",
                  "turnaround": "Case-based"
                }
              ],
              "contactNote": "To begin, contact us directly on WhatsApp.",
              "image": "https://images.pexels.com/photos/28224333/pexels-photo-28224333.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "imageAlt": "Real computer and headset scene suited to PTE booking",
              "landmarkImage": "https://images.pexels.com/photos/18966473/pexels-photo-18966473.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "landmarkAlt": "Headset-based computer setup matching the PTE exam format",
              "requirementsImage": "https://images.pexels.com/photos/28224333/pexels-photo-28224333.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "requirementsImageAlt": "Real technical setup matching PTE booking requirements",
              "servicesImage": "https://images.pexels.com/photos/18966473/pexels-photo-18966473.jpeg?auto=compress&cs=tinysrgb&w=1600",
              "servicesImageAlt": "Real digital exam scene supporting PTE booking content",
              "imagePosition": "center center",
              "landmarkPosition": "center center",
              "requirementsPosition": "center center",
              "servicesPosition": "center center"
            }
          ],
          "previewImage": "/images/hero/goethe-exam.jpg",
          "previewImageAlt": "Language exam preparation materials and academic certificate",
          "previewImagePosition": "center center"
        }
      ]
    },
    "common": {
      "homeLabel": "Home",
      "servicesLabel": "Services",
      "serviceDetailsLabel": "Service details",
      "optionsLabel": "Available options",
      "exploreLabel": "Explore",
      "backToServices": "Back to services",
      "availableItems": "Available options",
      "requirementsLabel": "Requirements",
      "whatsAppLabel": "Request on WhatsApp",
      "previousLabel": "Previous",
      "nextLabel": "Next",
      "validityLabel": "Validity",
      "turnaroundLabel": "Turnaround",
      "returnToService": "Back to service",
      "customerVoicesTitle": "Client feedback",
      "customerVoices": [
        {
          "name": "Mohamed Al Ali",
          "text": "The process felt clear from the first conversation, and each next step was easy to follow.",
          "gender": "male"
        },
        {
          "name": "Nour Ahmad",
          "text": "Communication was fast and comfortable, and the information arrived clearly without confusion.",
          "gender": "female"
        }
      ]
    }
  }
};

export function getServicesListing(locale: Locale) {
  return servicesContent[locale].listing;
}

export function getServicesCommon(locale: Locale) {
  return servicesContent[locale].common;
}

export function getServiceBySlug(locale: Locale, serviceSlug: string) {
  return servicesContent[locale].listing.services.find((service: ServiceRecord) => service.slug === serviceSlug);
}

export function getServiceItemBySlug(locale: Locale, serviceSlug: string, itemSlug: string) {
  const service = getServiceBySlug(locale, serviceSlug);
  if (!service) return null;
  const item = service.items.find((entry: ServiceItemRecord) => entry.slug === itemSlug);
  if (!item) return null;
  return { service, item };
}

export function getAdjacentItems(locale: Locale, serviceSlug: string, itemSlug: string) {
  const service = getServiceBySlug(locale, serviceSlug);
  if (!service) return { previous: null, next: null };
  const index = service.items.findIndex((item: ServiceItemRecord) => item.slug === itemSlug);
  return {
    previous: index > 0 ? service.items[index - 1] : null,
    next: index >= 0 && index < service.items.length - 1 ? service.items[index + 1] : null,
  };
}
