import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/Activity";

export default class ActivityStore {
    public activities: Activity[] = [];
    selectedActivity: Activity | undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            this.activities = activities.map(activity => {
                activity.date = activity.date.split('T')[0];
                return activity;
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    deleteActivity = async (id: string) => {
        this.setLoading(true);
        try {
            await agent.Activities.delete(id);
            this.activities.filter(a => a.id !== id);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    saveActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            if(activity.id) {
                const updatedActivity = await agent.Activities.update(activity);
                this.activities = [...this.activities.filter(a => a.id !== activity.id), updatedActivity];
                this.selectActivity(activity.id);
            } else {
                const newActivity = await agent.Activities.create(activity);
                this.activities.push(newActivity);
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

    selectActivity = (id: string) => this.selectedActivity = this.activities.find(a => a.id === id);

    cancelSelectedActivity = () => this.selectedActivity = undefined;

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => this.editMode = false;
}