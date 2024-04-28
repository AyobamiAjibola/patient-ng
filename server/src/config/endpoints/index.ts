import authEndpoints from "./auth.endpoints";
import userEndpoints from "./user.endpoints";
import blogEndpoints from "./blog.endpoints";
import podcastEndpoints from "./podcast.endpoints";
import webinarEndpoints from "./webinar.endpoints";
import patientStoriesEndpoints from "./patientStories.endpoint";
import transactionEndpoints from "./transaction.endpoints";
import crowedFundingEndpoints from "./crowedFunding.endpoints";

const endpoints = authEndpoints
    .concat(userEndpoints)
    .concat(blogEndpoints)
    .concat(webinarEndpoints)
    .concat(podcastEndpoints)
    .concat(patientStoriesEndpoints)
    .concat(transactionEndpoints)
    .concat(crowedFundingEndpoints)

export default endpoints;