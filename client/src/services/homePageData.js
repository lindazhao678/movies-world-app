import img1 from '../assets/HomePageImg/new-arrival-1.jpg';
import img2 from '../assets/HomePageImg/new-arrival-2.jpg';
import img3 from '../assets/HomePageImg/new-arrival-3.jpg'
import img4 from '../assets/HomePageImg/new-arrival-4.jpg';
import img5 from '../assets/HomePageImg/top-pick-1.jpg';
import img6 from '../assets/HomePageImg/top-pick-2.jpg';
import img7 from '../assets/HomePageImg/top-pick-3.jpg';
import img8 from '../assets/HomePageImg/top-pick-4.jpg';

const NewArrivalsData = [
    {
        id: 1,
        image: img1,
        link: "https://www.imdb.com/title/tt0242653/?ref_=tt_mv_close"
    },
    {
        id: 2,
        image: img2,
        link: "https://www.imdb.com/title/tt0234215/?ref_=fn_al_tt_1"
    },
    {
        id: 3,
        image: img3,
        link: "https://www.imdb.com/title/tt0448011/?ref_=fn_al_tt_1"
    },
    {
        id: 4,
        image: img4,
        link: "https://www.imdb.com/title/tt0259324/?ref_=fn_al_tt_1"
    }
]

const TopPicksData = [
    {
        id: 1,
        image: img5,
        link: "https://www.imdb.com/title/tt0313726/?ref_=fn_al_tt_1"
    },
    {
        id: 2,
        image: img6,
        link: "https://www.imdb.com/title/tt0360032/?ref_=fn_al_tt_1"
    },
    {
        id: 3,
        image: img7,
        link: "https://www.imdb.com/title/tt15428452/?ref_=nv_sr_srsg_3"
    },
    {
        id: 4,
        image: img8,
        link: "https://www.imdb.com/title/tt1024932/?ref_=fn_al_tt_1"
    }
]

export function getNewArrivalsData() {
    return NewArrivalsData
}

export function getTopPicksData() {
    return TopPicksData
}