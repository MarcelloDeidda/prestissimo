import Button from "../UI/Button";
import GradeModal from "./GradeModal";
import classes from "./MainMenu.module.css";
import logo from "../../assets/main-menu-logo.png";

import { useState } from "react";

const MainMenu = props => {
    const [showModal, setShowModal] = useState(false);
    const [partialSettings, setPartialSettings] = useState({});

    const openModalHandler = section => {
        if (["rhythm", "terms"].includes(section.section)) {
            return;
        }
        setPartialSettings({ section })
        setShowModal(true);
    }

    const closeModalHandler = () => {
        setPartialSettings({})
        setShowModal(false);
    }

    const sections = [
        {
            section: "pitch",
            title: "Pitch"
        },
        {
            section: "rhythm",
            title: "Rhythm"
        },
        {
            section: "keys",
            title: "Keys and Scales"
        },
        {
            section: "intervals",
            title: "Intervals"
        },
        {
            section: "terms",
            title: "Terms, Signs and Instruments"
        }
    ];

    const exerciseButtons = sections.map(section => {
        return <Button
            onClick={() => openModalHandler(section)}
            section={section.section}
            title={section.title}
            key={section.section}
            disabled={["rhythm", "terms"].includes(section.section)}
        />
    });

    return <div className={classes["main-menu"]}>
        <div className={classes["main-menu__title"]}>
            <h1>Prestissimo</h1>
            <div>
                <img src={logo} />
            </div>
        </div>
        <div className={classes["main-menu__sections"]}>
            {exerciseButtons}
        </div>
        {showModal && <GradeModal
            onClose={closeModalHandler}
            section={partialSettings.section}
            title={partialSettings.section.title}
            onStartExercise={props.onStartExercise}
        />}
    </div>
}

export default MainMenu;