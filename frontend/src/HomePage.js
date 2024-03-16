import React from 'react';
import './HomePage.css';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

function HomePage() {
    return (
        <div className="homepage">
            <NavBar />

            <div className="middle-content">
                <header className="header">
                    <h1>Půjčte si vůz vašich snů</h1>
                </header>

                <section className="about-us">
                    <h2>O nás</h2>
                    <p>Vítejte v naší autopůjčovně, kde si klademe za cíl poskytovat prvotřídní služby a nezapomenutelné
                        zážitky na každé cestě. Založena s vášní pro automobily a dobrodružství, naše společnost nabízí
                        širokou paletu vozidel, od ekonomických modelů pro každodenní potřeby až po luxusní vozy pro ty
                        nejspeciálnější příležitosti. S více než desetiletými zkušenostmi na trhu, jsme se stali
                        důvěryhodným partnerem pro tisíce spokojených zákazníků, kteří hledají kvalitu, flexibilitu a
                        bezkonkurenční zákaznický servis.</p>

                    <p>Naším posláním je učinit pronájem auta snadným a příjemným zážitkem. Ať už plánujete dovolenou
                        snů, obchodní cestu nebo jen potřebujete dočasnou náhradu za vaše vozidlo, jsme zde, abychom vám
                        pomohli najít ideální auto pro vaše potřeby. Náš vozový park je pravidelně obnovován a udržován
                        v perfektním stavu, abychom zaručili vaši bezpečnost a pohodlí na cestách.</p>

                    <p>V naší autopůjčovně si zakládáme na osobním přístupu a flexibilitě. S námi můžete očekávat
                        transparentní cenovou politiku bez skrytých poplatků a přátelský tým profesionálů, který je vám
                        k dispozici 24/7.</p>

                    <p>Objednejte si váš vysněný vůz ještě dnes a proměňte vaše cestovní plány v nezapomenutelné
                        zážitky. Vaše spokojenost je naší nejvyšší prioritou a těšíme se na možnost stát se součástí
                        vašich budoucích dobrodružství.</p>
                </section>
            </div>

            <Footer />
        </div>
    );
}

export default HomePage;