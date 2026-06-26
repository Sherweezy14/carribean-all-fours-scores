import flag from "../assets/tt-flag-01-XL.png"
import logo from "../assets/logo_nav.png"
export default function Footer(){
    return(
        <footer style={{
            backgroundImage: `url(${flag})`,
          }} className="bg-cover bg-center bg-no-repeat w-full flex items-center h-20 px-5 py-2">
                <div className="h-24"><img className="h-24" src={logo} alt="" /></div>
                <div className="flex flex-col text-white">
                    <p className="font-display text-2xl tracking-wider"> Unity sports club </p>
                    <p className="text-sm"> Building Community Through Sports & Culture </p>
                    <p className="text-yellow-500 font-mono "> One Community One Unity</p>
                </div>
        </footer>
    )
}