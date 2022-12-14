import 'tailwindcss/tailwind.css';

function Platform(props){

    const { index, name, icon, thumbnail, platformClickHandler } = props;

    function platformHandler(){
        platformClickHandler({ name: name, icon: icon, thumbnail: thumbnail });
    }

    if(index === 1){
        return (
            <button className="w-full h-[60px] text-left px-[20px] ring-1 ring-[#e9e9e9] hover:bg-createFinding animate-fadeInAnimate focus:outline-none focus:ring-2 focus:ring-spblue" onClick={platformHandler}>
                <div className="w-full flex items-center">
                    <img src={icon} alt={name} className="w-[42px]" />
                    <p className="ml-[20px] font-semibold">{name}p</p>
                </div>
            </button>
        );
        
    } else {
        return (
            <button className="w-full h-[60px] text-left px-[20px] ring-1 ring-[#e9e9e9] hover:bg-createFinding animate-fadeInAnimate focus:outline-none focus:ring-2 focus:ring-spblue" onClick={platformHandler}>
                <div className="w-full flex items-center">
                    <img src={icon} alt={name} className="w-[42px]" />
                    <p className="w-full ml-[20px] font-semibold">{name}</p>
                </div>
            </button>
        );
    }
}


export default function PlatformPicks(props){

    const { platformList, platformSearchResult, platformPickHandler, showPlatformHandler } = props;

    function platformClickHandler(value){
        platformPickHandler(value);
        showPlatformHandler();
    }

    const PlatformDOM = platformList.map((platform, index) => <Platform key={index+1} name={platform.name} icon={platform.icon} thumbnail={platform.thumbnail} platformClickHandler={platformClickHandler} />)
    const PlatformSearchResultDOM = platformSearchResult.map((platform, index) => <Platform key={index+1} name={platform.name} icon={platform.icon} thumbnail={platform.thumbnail} platformClickHandler={platformClickHandler} />);

    if(platformSearchResult.length){
        return (
            <section className="w-full h-[230px] top-13 ring-2 ring-spblue py-[0px] rounded-md absolute z-10 bg-white overflow-y-scroll animate-fadeInAnimate">
                { PlatformSearchResultDOM }
            </section>
        );

    } else {
        return (
            <section className="w-full h-[230px] top-13 ring-2 ring-spblue py-[0px] rounded-md absolute z-10 bg-white overflow-y-scroll animate-fadeInAnimate">
                { PlatformDOM }
            </section>
        );
    }

}