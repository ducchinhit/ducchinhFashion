import type { CategorySlug } from "./categories";

export interface LocalizedText {
  vi: string;
  en: string;
}

export interface Product {
  slug: string;
  category: CategorySlug;
  sku: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  details: { vi: string[]; en: string[] };
  care: { vi: string[]; en: string[] };
  price: number;
  sizes: string[];
  featured: boolean;
  swatch: string;
  accent: string;
}

export const products: Product[] = [
  {
    slug: "ash-merino-overcoat",
    category: "outerwear",
    sku: "DC-OC-101",
    name: { vi: "Áo Măng-tô Merino Xám Đá", en: "Ash Merino Overcoat" },
    shortDescription: {
      vi: "Măng-tô len merino cấu trúc mềm mại, form dáng thanh lịch.",
      en: "Structured merino wool overcoat with a softly tailored silhouette.",
    },
    description: {
      vi: "Được cắt may từ len merino Ý nguyên chất, chiếc măng-tô này giữ form vai vững chãi trong khi vạt áo đổ mềm mại theo từng bước đi. Một tác phẩm cho những ngày cần sự nghiêm cẩn mà vẫn ấm áp.",
      en: "Cut from pure Italian merino wool, this overcoat holds a confident shoulder line while the skirt falls softly with movement. Built for days that call for quiet authority.",
    },
    details: {
      vi: ["100% len merino Ý", "Lót lụa acetate", "Khuy sừng tự nhiên", "May tay các chi tiết viền"],
      en: ["100% Italian merino wool", "Acetate silk lining", "Natural horn buttons", "Hand-finished edges"],
    },
    care: {
      vi: ["Chỉ giặt khô", "Ủi hơi nhẹ ở nhiệt độ thấp", "Bảo quản trên móc treo có đệm"],
      en: ["Dry clean only", "Steam iron on low heat", "Store on a padded hanger"],
    },
    price: 24500000,
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    swatch: "#3b3630",
    accent: "#a9824c",
  },
  {
    slug: "single-breasted-wool-blazer",
    category: "outerwear",
    sku: "DC-OC-102",
    name: { vi: "Blazer Len Đơn Hàng Khuy", en: "Single-Breasted Wool Blazer" },
    shortDescription: {
      vi: "Blazer len cao cấp với đường cắt eo tinh tế.",
      en: "Premium wool blazer with a refined waist-defining cut.",
    },
    description: {
      vi: "Một chiếc blazer đa năng, chuyển tiếp dễ dàng từ văn phòng đến buổi tối. Vải len pha nhẹ giữ nếp tốt suốt cả ngày mà không mất đi sự thoải mái.",
      en: "A versatile blazer that moves easily from office to evening. The lightweight wool blend holds its shape all day without sacrificing comfort.",
    },
    details: {
      vi: ["Len pha cashmere 10%", "Túi ngực may tay", "Nút áo khắc logo", "Vai đệm mỏng tự nhiên"],
      en: ["10% cashmere wool blend", "Hand-stitched chest pocket", "Engraved logo buttons", "Natural light shoulder pad"],
    },
    care: {
      vi: ["Chỉ giặt khô", "Treo thoáng khí sau khi mặc", "Tránh ánh nắng trực tiếp"],
      en: ["Dry clean only", "Air out after wear", "Avoid direct sunlight"],
    },
    price: 16800000,
    sizes: ["XS", "S", "M", "L"],
    featured: true,
    swatch: "#2a2620",
    accent: "#cba86a",
  },
  {
    slug: "ivory-wool-trench",
    category: "outerwear",
    sku: "DC-OC-103",
    name: { vi: "Áo Khoác Dạ Trench Ngà", en: "Ivory Wool Trench" },
    shortDescription: {
      vi: "Trench coat dáng dài, tông ngà thanh khiết.",
      en: "A long-line trench in a pure ivory tone.",
    },
    description: {
      vi: "Lấy cảm hứng từ những buổi sáng Hà Nội se lạnh, chiếc trench này kết hợp form dáng cổ điển với chất liệu dạ mềm hiếm có, mang lại vẻ thanh lịch không phô trương.",
      en: "Inspired by crisp Hanoi mornings, this trench pairs a classic silhouette with a rare, soft wool-blend cloth for understated elegance.",
    },
    details: {
      vi: ["Dạ len pha 20% cashmere", "Đai lưng tháo rời", "Cổ áo có thể dựng đứng", "Lót trong bằng lụa"],
      en: ["20% cashmere wool blend", "Detachable belt", "Convertible stand collar", "Full silk lining"],
    },
    care: {
      vi: ["Chỉ giặt khô", "Ủi hơi nhẹ, mặt trái", "Không giặt máy"],
      en: ["Dry clean only", "Steam iron inside-out", "Do not machine wash"],
    },
    price: 19900000,
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    swatch: "#e7ded0",
    accent: "#2a2620",
  },
  {
    slug: "belted-shearling-jacket",
    category: "outerwear",
    sku: "DC-OC-104",
    name: { vi: "Áo Khoác Da Cừu Rút Dây", en: "Belted Shearling Jacket" },
    shortDescription: {
      vi: "Áo khoác da cừu lộn ấm áp, điểm nhấn đai rút.",
      en: "A warm shearling jacket finished with a drawstring waist.",
    },
    description: {
      vi: "Sự kết hợp giữa chất liệu da cừu thượng hạng và đường cắt hiện đại, tạo nên một tác phẩm outerwear vừa ấm áp vừa mang tính biểu tượng.",
      en: "A pairing of premium shearling and a modern cut, resulting in an outerwear piece that is both warm and unmistakably iconic.",
    },
    details: {
      vi: ["Da cừu lộn nguyên tấm", "Đai rút điều chỉnh eo", "Túi hai bên có nắp", "Sản xuất giới hạn theo mùa"],
      en: ["Full-grain shearling", "Adjustable waist drawstring", "Flapped side pockets", "Limited seasonal production"],
    },
    care: {
      vi: ["Vệ sinh chuyên nghiệp cho da", "Tránh nước mưa kéo dài", "Bảo quản nơi khô thoáng"],
      en: ["Professional leather cleaning only", "Avoid prolonged rain exposure", "Store in a dry, ventilated space"],
    },
    price: 38500000,
    sizes: ["S", "M", "L"],
    featured: true,
    swatch: "#5c4632",
    accent: "#e7ded0",
  },
  {
    slug: "silk-satin-slip-dress",
    category: "evening",
    sku: "DC-EV-201",
    name: { vi: "Đầm Lụa Satin Dáng Suông", en: "Silk Satin Slip Dress" },
    shortDescription: {
      vi: "Đầm lụa satin tối giản, đổ dáng theo tự nhiên.",
      en: "A minimal silk satin dress that falls with natural ease.",
    },
    description: {
      vi: "Cắt trên form chéo cổ điển, chiếc đầm satin này ôm nhẹ cơ thể mà không cần bất kỳ chi tiết thừa nào. Một lựa chọn cho những buổi tối cần sự tự tin lặng lẽ.",
      en: "Cut on a classic bias, this satin dress skims the body without a single unnecessary detail. Built for evenings that call for quiet confidence.",
    },
    details: {
      vi: ["100% lụa satin", "Dây vai có thể điều chỉnh", "Đường xẻ tà kín đáo", "Không cần lót trong"],
      en: ["100% silk satin", "Adjustable shoulder straps", "Discreet side slit", "No lining required"],
    },
    care: {
      vi: ["Giặt tay nước lạnh", "Không vắt xoắn", "Ủi hơi nhiệt độ thấp"],
      en: ["Hand wash cold", "Do not wring", "Low-heat steam iron"],
    },
    price: 12200000,
    sizes: ["XS", "S", "M", "L"],
    featured: true,
    swatch: "#c9a86a",
    accent: "#171310",
  },
  {
    slug: "pleated-velvet-gown",
    category: "evening",
    sku: "DC-EV-202",
    name: { vi: "Đầm Dạ Hội Xếp Ly Nhung", en: "Pleated Velvet Gown" },
    shortDescription: {
      vi: "Đầm dạ hội nhung dáng dài với các lớp xếp ly tay nghề cao.",
      en: "A floor-length velvet gown finished with hand-pleated detailing.",
    },
    description: {
      vi: "Từng lớp xếp ly được thực hiện thủ công, tạo chiều sâu cho form dáng khi ánh sáng lướt qua bề mặt nhung. Một tuyên ngôn cho những sự kiện quan trọng nhất.",
      en: "Each pleat is set by hand, adding dimension as light moves across the velvet surface. A statement piece for the most important occasions.",
    },
    details: {
      vi: ["Nhung tơ tằm cao cấp", "Xếp ly thủ công", "Khóa kéo ẩn phía sau", "Đuôi áo dạng sweep nhẹ"],
      en: ["Premium silk velvet", "Hand-set pleating", "Hidden back zip", "Soft sweep train"],
    },
    care: {
      vi: ["Chỉ giặt khô chuyên nghiệp", "Treo trên móc rộng bản", "Tránh gấp nếp lâu ngày"],
      en: ["Professional dry clean only", "Hang on a wide-shouldered hanger", "Avoid prolonged folding"],
    },
    price: 28900000,
    sizes: ["XS", "S", "M", "L"],
    featured: true,
    swatch: "#3a2436",
    accent: "#cba86a",
  },
  {
    slug: "halter-crepe-midi-dress",
    category: "evening",
    sku: "DC-EV-203",
    name: { vi: "Đầm Midi Crepe Cổ Yếm", en: "Halter Crepe Midi Dress" },
    shortDescription: {
      vi: "Đầm midi crepe cổ yếm, form dáng kiến trúc.",
      en: "An architectural halter-neck dress in fluid crepe.",
    },
    description: {
      vi: "Chất liệu crepe đổ dáng mềm mại kết hợp với phần cổ yếm cấu trúc, tạo nên sự cân bằng giữa mềm mại và chuẩn mực.",
      en: "Fluid crepe fabric meets a structured halter neckline, balancing softness with precision.",
    },
    details: {
      vi: ["Crepe pha viscose cao cấp", "Cổ yếm có thể điều chỉnh", "Độ dài midi qua gối", "Túi ẩn hai bên"],
      en: ["Premium viscose crepe blend", "Adjustable halter tie", "Below-the-knee midi length", "Hidden side pockets"],
    },
    care: {
      vi: ["Giặt tay hoặc giặt khô", "Không sấy máy", "Ủi mặt trái"],
      en: ["Hand wash or dry clean", "Do not tumble dry", "Iron inside-out"],
    },
    price: 14500000,
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
    swatch: "#6b5a44",
    accent: "#f7f3ec",
  },
  {
    slug: "hand-embroidered-silk-corset",
    category: "evening",
    sku: "DC-EV-204",
    name: { vi: "Áo Corset Lụa Thêu Tay", en: "Hand-Embroidered Silk Corset" },
    shortDescription: {
      vi: "Corset lụa với hoa văn thêu tay tinh xảo.",
      en: "A silk corset finished with intricate hand embroidery.",
    },
    description: {
      vi: "Mỗi đường thêu được thực hiện bởi nghệ nhân trong hơn 20 giờ, biến chiếc corset thành một tác phẩm nghệ thuật có thể mặc trên người.",
      en: "Every embroidered thread is set by an artisan over 20-plus hours, turning this corset into a wearable piece of craft.",
    },
    details: {
      vi: ["Lụa tơ tằm nguyên chất", "Thêu tay chỉ kim tuyến", "Xương nẹp linh hoạt", "Móc cài phía sau"],
      en: ["Pure mulberry silk", "Hand embroidery with metallic thread", "Flexible boning", "Back hook-and-eye closure"],
    },
    care: {
      vi: ["Chỉ giặt khô chuyên nghiệp", "Tránh tiếp xúc nước hoa trực tiếp", "Bảo quản trong túi vải"],
      en: ["Professional dry clean only", "Avoid direct perfume contact", "Store in a cloth garment bag"],
    },
    price: 9800000,
    sizes: ["XS", "S", "M"],
    featured: false,
    swatch: "#171310",
    accent: "#a9824c",
  },
  {
    slug: "two-piece-flannel-suit",
    category: "tailoring",
    sku: "DC-TL-301",
    name: { vi: "Suit Hai Mảnh Len Flannel", en: "Two-Piece Flannel Suit" },
    shortDescription: {
      vi: "Suit flannel hai mảnh, đường may chuẩn xác.",
      en: "A two-piece flannel suit cut with precision tailoring.",
    },
    description: {
      vi: "Được may đo theo phương pháp bán thủ công, bộ suit này cân bằng giữa cấu trúc vững chãi và sự thoải mái khi vận động cả ngày dài.",
      en: "Constructed using a half-canvas method, this suit balances a strong structure with all-day ease of movement.",
    },
    details: {
      vi: ["Len flannel Anh Quốc", "Kết cấu bán thủ công (half-canvas)", "Quần ống suông chuẩn", "Bao gồm áo vest và quần"],
      en: ["British flannel wool", "Half-canvas construction", "Classic straight-leg trousers", "Includes jacket and trousers"],
    },
    care: {
      vi: ["Chỉ giặt khô", "Ủi hơi định kỳ", "Treo trên móc có form vai"],
      en: ["Dry clean only", "Periodic steam pressing", "Hang on a shaped shoulder hanger"],
    },
    price: 32000000,
    sizes: ["46", "48", "50", "52"],
    featured: true,
    swatch: "#2a2620",
    accent: "#e3dbc9",
  },
  {
    slug: "egyptian-cotton-shirt",
    category: "tailoring",
    sku: "DC-TL-302",
    name: { vi: "Sơ Mi Cotton Ai Cập Trắng", en: "Egyptian Cotton Shirt" },
    shortDescription: {
      vi: "Sơ mi cotton sợi dài, form dáng chuẩn mực.",
      en: "A long-staple cotton shirt with an impeccable fit.",
    },
    description: {
      vi: "Dệt từ sợi cotton Ai Cập cao cấp, chiếc sơ mi này giữ được độ mềm và độ bóng nhẹ tự nhiên qua hàng trăm lần giặt.",
      en: "Woven from premium Egyptian cotton, this shirt keeps its softness and subtle sheen through hundreds of washes.",
    },
    details: {
      vi: ["100% cotton Ai Cập sợi dài", "Khuy áo bằng vỏ trai", "Cổ áo dựng chuẩn Âu", "May 12 mũi/inch"],
      en: ["100% long-staple Egyptian cotton", "Mother-of-pearl buttons", "Classic European collar", "12 stitches per inch"],
    },
    care: {
      vi: ["Giặt máy nước lạnh", "Ủi khi còn ẩm nhẹ", "Không dùng thuốc tẩy"],
      en: ["Machine wash cold", "Iron while slightly damp", "No bleach"],
    },
    price: 6900000,
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    swatch: "#f7f3ec",
    accent: "#2a2620",
  },
  {
    slug: "wide-leg-tailored-trousers",
    category: "tailoring",
    sku: "DC-TL-303",
    name: { vi: "Quần Âu Ống Suông Cao Cấp", en: "Wide-Leg Tailored Trousers" },
    shortDescription: {
      vi: "Quần âu ống rộng, cạp cao, chất liệu len mềm.",
      en: "High-waisted, wide-leg trousers in soft wool.",
    },
    description: {
      vi: "Đường ly trước sắc nét kết hợp ống quần đổ rộng, mang lại vẻ ngoài hiện đại nhưng vẫn giữ tinh thần may đo cổ điển.",
      en: "A sharp front crease meets a generous wide leg, striking a modern silhouette while staying true to classic tailoring.",
    },
    details: {
      vi: ["Len pha mềm mại", "Cạp cao gài móc", "Ly trước kép", "Gấu quần chưa xử lý để chỉnh theo chiều cao"],
      en: ["Soft wool blend", "High rise with hook closure", "Double front pleat", "Unfinished hem for tailoring to height"],
    },
    care: {
      vi: ["Chỉ giặt khô", "Ủi hơi giữ nếp ly", "Treo bằng kẹp quần"],
      en: ["Dry clean only", "Steam iron to maintain crease", "Hang with trouser clips"],
    },
    price: 8400000,
    sizes: ["44", "46", "48", "50"],
    featured: false,
    swatch: "#4a4438",
    accent: "#f7f3ec",
  },
  {
    slug: "cashmere-wool-waistcoat",
    category: "tailoring",
    sku: "DC-TL-304",
    name: { vi: "Áo Ghi-lê Len Cashmere", en: "Cashmere Wool Waistcoat" },
    shortDescription: {
      vi: "Ghi-lê cashmere nhẹ, có thể phối rời hoặc theo bộ.",
      en: "A lightweight cashmere waistcoat, worn alone or as part of a set.",
    },
    description: {
      vi: "Một món đồ linh hoạt hiếm có — đủ tinh tế để phối cùng suit, đủ thoải mái để mặc rời trong những ngày làm việc bận rộn.",
      en: "A rare, versatile piece — refined enough to pair with a suit, relaxed enough to wear on its own.",
    },
    details: {
      vi: ["90% len, 10% cashmere", "Lưng lót lụa có đai chỉnh", "Bốn túi chức năng", "Khuy sừng tự nhiên"],
      en: ["90% wool, 10% cashmere", "Silk-lined back with adjustable strap", "Four functional pockets", "Natural horn buttons"],
    },
    care: {
      vi: ["Chỉ giặt khô", "Bảo quản gấp phẳng trong hộp", "Tránh treo dài hạn để giữ form"],
      en: ["Dry clean only", "Store folded flat in a box", "Avoid long-term hanging to preserve shape"],
    },
    price: 11600000,
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    swatch: "#5c4632",
    accent: "#cba86a",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}
