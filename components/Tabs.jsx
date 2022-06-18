import React from 'react'

export const Tabs = ({ nomElement1, element1, nomElement2, element2, nomElement3, element3, nomElement4, element4 }) => {
    const [openTab, setOpenTab] = React.useState(1);

    return (
        <div className="w-full h-full p-4 m-8 overflow-y-auto space-y-10">
            <ul className="flex text-justify border-b border-gray-200">
                <div className="flex flex-wrap">
                    <div className="w-full">
                        <ul
                            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                            role="tablist"
                        >
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                    className={
                                        "text-base font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                        (openTab === 1
                                            ? "text-custom-blue bg-" + "black" + "-600"
                                            : "text-" + "black" + "-600 bg-white")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(1);
                                    }}
                                    data-toggle="tab"
                                    href="#link1"
                                    role="tablist"
                                >
                                    <i className="fas fa-space-shuttle text-base mr-1"></i> {nomElement1}
                                </a>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                    className={
                                        "text-base font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                        (openTab === 2
                                            ? "text-custom-blue bg-" + "black" + "-600"
                                            : "text-" + "black" + "-600 bg-white")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(2);
                                    }}
                                    data-toggle="tab"
                                    href="#link2"
                                    role="tablist"
                                >
                                    <i className="fas fa-cog text-base mr-1"></i>  {nomElement2}
                                </a>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                    className={
                                        "text-base font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                        (openTab === 3
                                            ? "text-custom-blue bg-" + "black" + "-600"
                                            : "text-" + "black" + "-600 bg-white")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(3);
                                    }}
                                    data-toggle="tab"
                                    href="#link3"
                                    role="tablist"
                                >
                                    <i className="fas fa-briefcase text-base mr-1"></i>  {nomElement3}
                                </a>
                            </li>
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                    className={
                                        "text-base font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                        (openTab === 4
                                            ? "text-custom-blue bg-" + "black" + "-600"
                                            : "text-" + "black" + "-600 bg-white")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(4);
                                    }}
                                    data-toggle="tab"
                                    href="#link4"
                                    role="tablist"
                                >
                                    <i className="fas fa-briefcase text-base mr-1"></i>  {nomElement4}
                                </a>
                            </li>
                        </ul>
                        <div>
                            <div className="px-4 py-5 flex-auto">
                                <div className="tab-content tab-space">
                                    <div className={openTab === 1 ? "block" : "hidden"} key="link1" id="link1">
                                        {element1}
                                    </div>
                                    <div className={openTab === 2 ? "block" : "hidden"} key="link2" id="link2">
                                        {element2}
                                    </div>
                                    <div className={openTab === 3 ? "block" : "hidden"} key="link3" id="link3">
                                        {element3}
                                    </div>
                                    <div className={openTab === 4 ? "block" : "hidden"} key="link4" id="link4">
                                        {element4}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    )
}