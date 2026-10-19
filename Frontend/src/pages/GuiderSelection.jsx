import Header from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import GuiderDetailsCard from "../components/GuiderDetailsCard.jsx"
import "../styles/GuiderSelection.css"
import { useEffect, useState } from "react";

function GuiderSelection() {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/guides")
    .then((response)=> response.json())
    .then((data) => {
      console.log(data);
      setGuides(data);
    })
    .catch((error) => {
          console.error("Backend error:", error);

        });
      }, []);

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