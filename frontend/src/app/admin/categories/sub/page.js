import CategoryManager from "@/components/admin/CategoryManager";

export default function SubCategoriesPage() {
  return (
    <CategoryManager
      level="sub"
      title="Home Decor Sub Categories"
      subtitle="Select a main home decor category and manage its subcategories like Ceramic Vases, Metal Candle Holders, Brass Urlis and Temple Decor."
    />
  );
}