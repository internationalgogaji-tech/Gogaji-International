import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientFeedSection from "@/components/ClientFeedSection";

export const metadata = { title: "Client Feed | Gogaji International", description: "Discover Gogaji home decor in real client spaces." };

export default function ClientFeedPage() {
  return <main className="min-h-screen bg-white"><Navbar /><ClientFeedSection limit={48} /><Footer /></main>;
}