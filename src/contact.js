import contact from "./345614141_603315041534774_4573198782589312240_n.jpg";
import './contact.css'

function Contact() {
    return (
        <div className="text-and-picture">
            <div className="round-picture-container">
                <img src={contact} className="round-picture"/>
            </div>
            <div>
                <h3>Théo Lardeur Gersztein</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue vulputate ligula vel
                    euismod. Ut imperdiet enim sit amet sem faucibus, eu luctus nisl pretium. Quisque pulvinar suscipit
                    sapien, eu
                    gravida
                    urna laoreet at. Donec malesuada eros nibh, ac condimentum magna mattis et. Class aptent taciti
                    sociosqu
                    ad
                    litora torquent per conubia nostra, per inceptos himenaeos. Praesent nec pretium tortor. Curabitur
                    condimentum augue quis pharetra fermentum.
                </p>
            </div>
        </div>
    )
}


export default Contact