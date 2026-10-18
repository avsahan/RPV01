import Header from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import GuiderDetailsCard from "../components/GuiderDetailsCard.jsx"
import "../styles/GuiderSelection.css"

function GuiderSelection() {
    const guides = [
  {
    id: 1,
    name: "Ishani Perera",
    location: "Kandy, Sri Lanka",
    speciality: "Culture & temple walks",
    description:
      "Explore sacred temples, lakeside lanes and Kandyan traditions at an easy pace.",
    fee: 10500,
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Kasun Dissanayake",
    location: "Sigiriya, Sri Lanka",
    speciality: "Ancient cities & heritage",
    description:
      "Uncover the stories of Lion Rock, ancient gardens and the Cultural Triangle.",
    fee: 13500,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Sahan Silva",
    location: "Ella, Sri Lanka",
    speciality: "Trekking & mountain trails",
    description:
      "Guided hikes across Nine Arches Bridge, Little Adam’s Peak, and local tea estates.",
    fee: 12000,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
  }
];

    return (
        <>
        <Header />
            <main className="guide-page">
                <div className="guide-page__container">
                <GuiderDetailsCard img="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85" location="hell" name="jason lucia" speciality="better runner" desciption="nodody gonna survivor after this adventure" fee="1000"/>
                {guides.map((guide) => (<GuiderDetailsCard key={guide.id} img={guide.img} location={guide.location} name={guide.name} speciality={guide.speciality} description={guide.description} fee={guide.fee}/>))}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default GuiderSelection;