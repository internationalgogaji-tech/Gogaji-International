const mongoose = require("mongoose");

/* =========================================================
   CONTACT CARD
   ========================================================= */

const contactCardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },

    value: {
      type: String,
      trim: true,
      default: "",
    },

    subText: {
      type: String,
      trim: true,
      default: "",
    },

    /*
      Supported examples:
      phone
      mail
      whatsapp
      map-pin
      clock
    */
    icon: {
      type: String,
      trim: true,
      default: "phone",
    },

    link: {
      type: String,
      trim: true,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: true,
  }
);

/* =========================================================
   CONTACT PAGE
   ========================================================= */

const ContactPageSchema = new mongoose.Schema(
  {
    /* =========================
       HERO SECTION
       ========================= */

    heroTitle: {
      type: String,
      default: "We’d Love to Hear From You",
      trim: true,
    },

    heroSubtitle: {
      type: String,
      default:
        "Whether you need help choosing the perfect home decor piece, have a question about your order, or want to discuss bulk gifting, the Gogaji International team is here to help.",
      trim: true,
    },

    /* =========================
       SUPPORT SECTION
       ========================= */

    supportTitle: {
      type: String,
      default: "Let’s Make Your Space Beautiful",
      trim: true,
    },

    supportDescription: {
      type: String,
      default:
        "Looking for elegant decor for your home, festive styling, pooja essentials, gifting solutions or bulk orders? Share your requirements with us and our team will help you find the right collection.",
      trim: true,
    },

    /* =========================
       PRIMARY CONTACT DETAILS
       ========================= */

    email: {
      type: String,
      default: "gogaji.internationalmbd@gmail.com",
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "+91 73517 67928",
      trim: true,
    },

    whatsapp: {
      type: String,
      default: "+91 73517 67928",
      trim: true,
    },

    address: {
      type: String,
      default: "Gogaji International, Moradabad, Uttar Pradesh, India",
      trim: true,
    },

    businessHours: {
      type: String,
      default: "Monday - Saturday, 10:00 AM - 7:00 PM",
      trim: true,
    },

    mapEmbedUrl: {
      type: String,
      default: "",
      trim: true,
    },

    /* =========================
       CONTACT CARDS
       ========================= */

    cards: {
      type: [contactCardSchema],

      default: [
        {
          title: "Call Us",
          value: "+91 73517 67928",
          subText:
            "Talk to our team for product, order and collection assistance.",
          icon: "phone",
          link: "tel:+917351767928",
          isActive: true,
          order: 1,
        },

        {
          title: "Email Us",
          value: "gogaji.internationalmbd@gmail.com",
          subText:
            "Send us your product enquiry, order query or bulk requirement.",
          icon: "mail",
          link: "mailto:gogaji.internationalmbd@gmail.com",
          isActive: true,
          order: 2,
        },

        {
          title: "Chat on WhatsApp",
          value: "+91 73517 67928",
          subText:
            "Get quick assistance for products, gifting and order support.",
          icon: "whatsapp",
          link: "https://wa.me/917351767928",
          isActive: true,
          order: 3,
        },

        {
          title: "Visit Us",
          value: "Moradabad, Uttar Pradesh, India",
          subText:
            "Connect with Gogaji International for premium home decor and gifting.",
          icon: "map-pin",
          link: "",
          isActive: true,
          order: 4,
        },

        {
          title: "Business Hours",
          value: "10:00 AM - 7:00 PM",
          subText: "Monday to Saturday",
          icon: "clock",
          link: "",
          isActive: true,
          order: 5,
        },
      ],
    },

    /* =========================
       SEO
       ========================= */

    seo: {
      metaTitle: {
        type: String,
        trim: true,
        default:
          "Contact Gogaji International | Home Decor & Gifting Support",
      },

      metaDescription: {
        type: String,
        trim: true,
        default:
          "Contact Gogaji International for premium home decor, pooja essentials, decorative accessories, gifting solutions, bulk orders and customer support.",
      },

      metaKeywords: {
        type: [String],

        default: [
          "Gogaji International contact",
          "Gogaji International home decor",
          "home decor customer support",
          "home decor Moradabad",
          "premium home decor India",
          "home decor gifting",
          "corporate gifting India",
          "bulk gifting supplier",
          "pooja decor India",
          "decorative accessories India",
        ],
      },
    },

    /* =========================
       PAGE STATUS
       ========================= */

    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

/* =========================================================
   MODEL
   ========================================================= */

module.exports =
  mongoose.models.ContactPage ||
  mongoose.model("ContactPage", ContactPageSchema);