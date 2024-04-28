import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;
import { createStoryHandler, updateStoryHandler, userStoriesHandler } from '../../routes/patientStoriesRoute';

const patientStoriesEndpoints: RouteEndpoint  = [
    {
        name: 'post story',
        method: 'post',
        path: '/post-story',
        handler: createStoryHandler
    },
    {
        name: 'update story',
        method: 'put',
        path: '/update-story/:storyId',
        handler: updateStoryHandler
    },
    {
        name: 'single story',
        method: 'get',
        path: '/single-story/:storyId',
        handler: updateStoryHandler
    },
    {
        name: 'get stories',
        method: 'get',
        path: '/get-stories',
        handler: updateStoryHandler
    },
    {
        name: 'get user stories',
        method: 'get',
        path: '/get-user-stories',
        handler: userStoriesHandler
    },
    {
        name: 'delete story',
        method: 'delete',
        path: '/delete-story/:storyId',
        handler: updateStoryHandler
    }
];

export default patientStoriesEndpoints;