import ACTION_TYPES from './action.types';

const {
    GET_CONTRIBUTIONS_START,
    GET_CONTRIBUTIONS_SUCCESS,
    GET_CONTRIBUTIONS_FAILED,

    CREATE_CONTRIBUTION_START,
    CREATE_CONTRIBUTION_SUCCESS,
    CREATE_CONTRIBUTION_FAILED,

    UPDATE_CONTRIBUTION_START,
    UPDATE_CONTRIBUTION_SUCCESS,
    UPDATE_CONTRIBUTION_FAILED,

    DESTROY_CONTRIBUTIONS_START,
    DESTROY_CONTRIBUTIONS_SUCCESS,
    DESTROY_CONTRIBUTIONS_FAILED
} = ACTION_TYPES;


export const getContributions = (payload = {}) => ({
    type: GET_CONTRIBUTIONS_START,
    payload
});

export const getContributionsSuccess = (payload) => ({
    type: GET_CONTRIBUTIONS_SUCCESS,
    payload
});

export const getContributionsFailed = (payload) => ({
    type: GET_CONTRIBUTIONS_FAILED,
    payload
});

export const createContribution = (payload) => ({
    type: CREATE_CONTRIBUTION_START,
    payload
});

export const createContributionSuccess = () => ({
    type: CREATE_CONTRIBUTION_SUCCESS
});

export const createContributionFailed = (payload) => ({
    type: CREATE_CONTRIBUTION_FAILED,
    payload
});

export const updateContribution = (payload) => ({
    type: UPDATE_CONTRIBUTION_START,
    payload
});

export const updateContributionSuccess = () => ({
    type: UPDATE_CONTRIBUTION_SUCCESS
});

export const updateContributionFailed = (payload) => ({
    type: UPDATE_CONTRIBUTION_FAILED,
    payload
});

export const destroyContributions = (payload) => ({
    type: DESTROY_CONTRIBUTIONS_START,
    payload
});

export const destroyContributionsSuccess = (payload) => ({
    type: DESTROY_CONTRIBUTIONS_SUCCESS,
    payload
});

export const destroyContributionsFailed = (payload) => ({
    type: DESTROY_CONTRIBUTIONS_FAILED,
    payload
});