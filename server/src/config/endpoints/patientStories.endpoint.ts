import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;
import { createStoryHandler, deleteStoryHandler, publishStoryHandler, rejectStoryHandler, singleStoryHandler, storiesHandler, updateStoryHandler, userStoriesHandler } from '../../routes/patientStoriesRoute';

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
        handler: singleStoryHandler
    },
    {
        name: 'get stories',
        method: 'get',
        path: '/get-stories',
        handler: storiesHandler
    },
    {
        name: 'get user stories',
        method: 'get',
        path: '/get-user-stories/:storyId',
        handler: userStoriesHandler
    },
    {
        name: 'delete story',
        method: 'delete',
        path: '/delete-story/:storyId',
        handler: deleteStoryHandler
    },
    {
        name: 'publish story',
        method: 'put',
        path: '/publish-story/:storyId',
        handler: publishStoryHandler
    },
    {
        name: 'reject story',
        method: 'put',
        path: '/reject-story/:storyId',
        handler: rejectStoryHandler
    }
];

export default patientStoriesEndpoints;