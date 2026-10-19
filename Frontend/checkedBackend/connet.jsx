import { useEffect, useState } from "react";

function Connet() {
    const [massage, setMassage] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/guides")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setMassage(data);
        })
        .catch((error) => {
        console.error("Backend error:", error);
        setMassage("Could not connect to backend.");
      });
    }, []);
    
 return (
    <div>
    {massage.map((guide) => (<div key={guide.id}>
          <h3>{guide.name}</h3>
          <p>Location: {guide.location}</p>
          <p>Rating: {guide.rating}</p>
        </div>
        ))}
    </div>
 );
}

export default Connet;