import { useState } from "react";

function TraverDashboard() {
    const [view, setview] = useState("guides");

    return(
        <main className="traveler-dashboard">
            <div className="traveler-welcome__copy">
                <p className="traveler-eyebrow">Your travel space</p>
                <h1 id="traveler-welcome-title">Good morning, Nuwan<span>.</span></h1>
                <p>Every detail of your next journey, right where you need it.</p>
            </div>
            <div>
                <button onClick={() => {setview("guides")}}>guides</button>
                <button onClick={() => {setview("profile")}}>profile</button>
                {
                    view === "profile" && (
                        <div>
                        <h1>My Profile</h1>
                        <p>Manage your traveler profile.</p>
                        </div>
                     )
                }
                { view === "guides" && (<h1>now the concept little bit understand</h1>)}
            </div>
        </main>
    );
}

export default TraverDashboard;