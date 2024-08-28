import { Menus } from '../components/Menus/menus';
import { LuBedDouble, LuCalendarCheck2 } from 'react-icons/lu';
import { CiLogin, CiLogout } from 'react-icons/ci';
import Comment from '../components/comment';
import { CommentList, IconContainer, Kpi, KpiContainer, KpiData } from '../components/pagesGeneralComponents';
import { getTimeDifference, mockComments, mockData } from '../utils';

export const DashboardPage = () => {
    return(
        <>
            <Menus title="Dashboard">
                <KpiContainer>
                    <Kpi>
                        <IconContainer $selected={false}>
                            <LuBedDouble className="icon"/>
                        </IconContainer>
                        <KpiData>
                            <h6 className="value">{mockData.bookings}</h6>
                            <p className="description">New booking</p>
                        </KpiData>
                    </Kpi>
                    <Kpi>
                        <IconContainer $selected={true}>
                            <LuCalendarCheck2 className="icon"/>
                        </IconContainer>
                        <KpiData>
                            <h6 className="value">{mockData.occupation}%</h6>
                            <p className="description">Ocupation</p>
                        </KpiData>
                    </Kpi>
                    <Kpi>
                        <IconContainer $selected={false}>
                            <CiLogin className="icon"/>
                        </IconContainer>
                        <KpiData>
                            <h6 className="value">{mockData.checkIns}</h6>
                            <p className="description">Check in</p>
                        </KpiData>
                    </Kpi>
                    <Kpi>
                        <IconContainer $selected={false}>
                            <CiLogout className="icon"/>
                        </IconContainer>
                        <KpiData>
                            <h6 className="value">{mockData.checkOuts}</h6>
                            <p className="description">Check out</p>
                        </KpiData>
                    </Kpi>
                </KpiContainer>
                <CommentList>
                    <h3>Latest Reviews by Customers</h3>
                    <div>
                        {mockComments.map((comment, index) => (
                            <Comment comment={comment} timeAgo={getTimeDifference(new Date(comment.timestamp).getTime())} key={index}/>
                        ))}
                    </div>
                </CommentList>
            </Menus>
        </>
    )
};