import {todayDate} from "../Utilits/getData";

let initialState = {
    collocuters: [
        {
            id: 1,
            name: "Vova",
            avatar:
                "https://avatars.mds.yandex.net/i?id=7379054b2759f4afb429c09a43f43d0f-4237119-images-thumbs&n=13&exp=1",
        },
        {
            id: 2,
            name: "Dmitriy",
            avatar:
                "https://avatars.mds.yandex.net/i?id=d5ccd6ccfbe34f0be2bd3995ba69c4dd-5653325-images-thumbs&n=13&exp=1",
        },
        {
            id: 3,
            name: "Valentina",
            avatar:
                "https://phototass2.cdnvideo.ru/width/1200_4ce85301/tass/m2/uploads/i/20210127/5959379.jpg",
        },
        {
            id: 4,
            name: "Mihail",
            avatar:
                "https://avatars.mds.yandex.net/i?id=f1ac3e1bd2ebb5b558f23397c5e95c29-5888827-images-thumbs&n=13&exp=1",
        },
    ],
    groups: [
        {
            id: 1,
            logo: "WR",
            name: "Wert Rest",
            time: "2 sec",
        },
        {
            id: 2,
            logo: "VR",
            name: "View Restart",
            time: "14 min",
        },
    ],
    newMassageText: "",
    myMassages: [
        {
            id: 1,
            massage: "Hi, how are you?",
            date: "Mon 10:20am",
        },
        {
            id: 2,
            massage: "I'm fine",
            date: "Mon 10:40am",
        },
    ],
    partnerMassages: [
        {
            id: 1,
            massage:
                "I want those files for you. I want you to send 1 PDF and 1 image file.",
            date: "Mon 10:40am",
        },
    ],
}


const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD-MASSAGE":{
            let addMassage = state.myMassages.slice(-1)[0].id;
            let newMassage = {
                id: addMassage + 1,
                massage: state.newMassageText,
                date: `${todayDate().dayName} | ${todayDate().time} | ${
                    todayDate().date
                }`,
            };
            // let stateCopy =
            return {
                ...state,
                myMassages:[...state.myMassages, newMassage],
                newMassageText: ""
            };
        }
        case "UPDATE-NEW-MASSAGE-TEXT":
            // let stateCopy =
            return {
                ...state,
                newMassageText: action.newText
            }

        default:
            return state;
    }
};



export let addMassageActionCreator = () => {
    return {
        type: "ADD-MASSAGE",
    };
};

export let updateNewMassageTextActionCreator = (text) => {
    return {
        type: "UPDATE-NEW-MASSAGE-TEXT",
        newText: text,
    };
};

export default messageReducer;
