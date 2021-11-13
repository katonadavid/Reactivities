import React, { Fragment } from "react";
import { observer } from 'mobx-react-lite';
import { Header } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import ActivityListItem from "./ActivityListItem";

function ActivityList() {

    const {groupedActivites: activities} = useStore().activityStore;

    return (
        <>
            {activities.map(([date, activities]) => (
                <Fragment key={date}>
                    <Header sub color='teal'>
                        {date}
                    </Header>
                        {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity} />
                        ))}
                </Fragment>
            ))}
        </>
    )
}

export default observer(ActivityList)