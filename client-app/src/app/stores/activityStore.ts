import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/Activity";
import { format } from 'date-fns';

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedActivites() {
        return Object.entries(
            this.activitiesByDate.reduce((groupedActivities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy');
                groupedActivities[date] = groupedActivities[date] ? [...groupedActivities[date], activity] : [activity];
                return groupedActivities;
            }, {} as {[e: string] : Activity[]})
        )
    }

    loadActivities = async () => {
        this.clearActivities();
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            });
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        this.setSelectedActivity(undefined);
        let activity = this.getActivity(id);
        if(activity) {
            this.setSelectedActivity(activity);
            return activity;
        } else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                this.setSelectedActivity(activity);
                return activity;
            } catch (error) {
                console.log(error);
            } finally {
                this.setLoadingInitial(false)
            }
        }
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private setActivity (activity: Activity) {
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id!, activity);
    }

    private setSelectedActivity (activity: Activity | undefined) {
        this.selectedActivity = activity;
    }

    private clearActivities () {
        this.activityRegistry.clear();
    }

    deleteActivity = async (id: string) => {
        this.setLoading(true);
        try {
            await agent.Activities.delete(id);
            runInAction(() => this.activityRegistry.delete(id));
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoading(false);
        }
    }

    saveActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            if(activity.id) {
                const updatedActivity = await agent.Activities.update(activity);
                this.setActivity(updatedActivity)
                this.setSelectedActivity(updatedActivity)
                return updatedActivity;
            } else {
                const newActivity = await agent.Activities.create(activity);
                this.setActivity(newActivity)
                this.setSelectedActivity(newActivity)
                return newActivity;
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.setEditMode(false)
            this.setLoading(false);
        }
    }

    setLoadingInitial = (state: boolean) => this.loadingInitial = state;

    setLoading = (state: boolean) => this.loading = state;

    setEditMode = (state: boolean) => this.editMode = state;
}