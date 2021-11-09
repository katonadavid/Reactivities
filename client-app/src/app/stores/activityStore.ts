import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/Activity";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = this.formatDate(activity.date);
                this.activityRegistry.set(activity.id, activity);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    formatDate(date: string) {
        return date.split('T')[0];
    }

    deleteActivity = async (id: string) => {
        this.setLoading(true);
        try {
            await agent.Activities.delete(id);
            this.activityRegistry.delete(id);
            if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
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
                updatedActivity.date = this.formatDate(updatedActivity.date);
                this.activityRegistry.set(updatedActivity.id, updatedActivity);
                this.selectActivity(activity.id);
            } else {
                const newActivity = await agent.Activities.create(activity);
                newActivity.date = this.formatDate(newActivity.date);
                this.activityRegistry.set(newActivity.id, newActivity);
                this.selectActivity(newActivity.id);
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

    selectActivity = (id: string) => this.selectedActivity = this.activityRegistry.get(id);

    cancelSelectedActivity = () => this.selectedActivity = undefined;

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => this.editMode = false;
}