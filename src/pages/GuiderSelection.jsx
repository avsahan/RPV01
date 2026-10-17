import GuiderCard from "../components/GuiderDetailsCard.jsx"

function GuiderSelection() {

    return (
        <>
            <header className="guide-page__heading">
          <div>
            <p className="guide-eyebrow">Find your local expert</p>
            <h1>Make your locationName escape unforgettable.</h1>
            <p>Meet trusted local guides who can make every day feel like your own.</p>
          </div>
          
        </header>
            <main className="guide-page">
                <div className="guide-page__container">
                <GuiderCard name='gtytyytrry' />
                </div>
            </main>
        </>
    );
}

export default GuiderSelection;