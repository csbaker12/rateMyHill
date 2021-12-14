import * as resorts from './index';
import axios from 'axios';
// import { getAuthHeaders } from '../../components/utils/tools';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getResorts = () => {
  return async (dispatch) => {
    try {
      const resortList = await axios.get(`/resort/manage`);
      dispatch(resorts.getResorts(resortList.data));
      // dispatch(resorts.successGlobal('Resorts Loaded'));
    } catch (error) {
      dispatch(resorts.errorGlobal('Error loading resorts'));
    }
  };
};

export const getResortById = (id) => {
  return async (dispatch) => {
    try {
      const resortData = await axios.get(`/resort/manage/${id}`);
      dispatch(resorts.getResortById(resortData.data.resort));
    } catch (error) {
      dispatch(resorts.errorGlobal('Error fetching resort'));
    }
  };
};

export const updateResort = (resortData) => {
  return async (dispatch) => {
    try {
      console.log(resortData);
      const updatedResort = await axios.patch(`/resort/manage`, resortData);
      console.log(updatedResort);
      dispatch(resorts.updateResort(updatedResort.data));
      dispatch(resorts.successGlobal('Resort Updated'));
    } catch (error) {
      dispatch(resorts.errorGlobal('Error updating resort'));
    }
  };
};

export const createResort = (resortData) => {
  return async (dispatch) => {
    try {
      console.log(resortData);
      const newResort = await axios.post(`/resort/manage`, resortData);
      console.log(newResort);
      dispatch(resorts.createResort(newResort.data));
      dispatch(resorts.successGlobal('Resort Created'));
    } catch (error) {
      dispatch(resorts.errorGlobal('Error creating resort'));
    }
  };
};

export const deleteResort = (id) => {
  return async (dispatch) => {
    try {
      const deletedResort = await axios.delete(`/resort/manage/${id}`);
      dispatch(resorts.deleteResort(deletedResort.data));
      dispatch(resorts.successGlobal('Resort Deleted'));
    } catch (error) {
      dispatch(resorts.errorGlobal('Error deleting resort'));
    }
  };
};
