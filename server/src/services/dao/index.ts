import UserRepository from "../../repository/UserRepository";
import BlogRepository from "../../repository/BlogRepository";
import PatientStoriesRepository from "../../repository/PatientStoriesRepository";
import PodcastRepository from "../../repository/PodcastRepository";
import WebinarRepository from "../../repository/WebinarRepository";
import BlogCommentsRepository from "../../repository/BlogCommentsRepository";
import CrowdFundingRepository from "../../repository/CrowdFundingRepository";
import TransactionRepository from "../../repository/TransactionRepository";
import PaymentRequestRepository from "../../repository/PaymentRequestRepository";
import BankRepository from "../../repository/BankRepository";

import UserDAOService from "./UserDAOService";
import BlogDAOService from "./BlogDAOService";
import PatientStoriesDAOService from "./PatientStoriesDAOService";
import PodcastDAOService from "./PodcastDAOService";
import WebinarDAOService from "./WebinarDAOService";
import BlogCommentsDAOService from "./BlogCommentsDAOService";
import CrowdFundingDAOService from "./CrowdFundingDAOService";
import TransactionDAOService from "./TransactionDAOService";
import PaymentRequestDAOService from "./PaymentRequestDAOService";
import BankDAOService from "./BankDAOService";

const userRepository = new UserRepository();
const blogRepository = new BlogRepository();
const patientStoriesRepository = new PatientStoriesRepository();
const podcastRepository = new PodcastRepository();
const webinarRepository = new WebinarRepository();
const blogCommentsRepository = new BlogCommentsRepository();
const crowdFundingRepository = new CrowdFundingRepository();
const transactionRepository = new TransactionRepository();
const paymentRequestRepository = new PaymentRequestRepository();
const bankRepository = new BankRepository();

const userDAOService = new UserDAOService(userRepository);
const blogDAOService = new BlogDAOService(blogRepository);
const patientStoriesDAOService = new PatientStoriesDAOService(patientStoriesRepository);
const podcastDAOService = new PodcastDAOService(podcastRepository);
const webinarDAOService = new WebinarDAOService(webinarRepository);
const blogCommentsDAOService = new BlogCommentsDAOService(blogCommentsRepository);
const crowdFundingDAOService = new CrowdFundingDAOService(crowdFundingRepository);
const transactionDAOService = new TransactionDAOService(transactionRepository);
const paymentRequestDAOService = new PaymentRequestDAOService(paymentRequestRepository);
const bankDAOService = new BankDAOService(bankRepository);

export default {
    userDAOService,
    blogDAOService,
    patientStoriesDAOService,
    podcastDAOService,
    webinarDAOService,
    blogCommentsDAOService,
    crowdFundingDAOService,
    transactionDAOService,
    paymentRequestDAOService,
    bankDAOService
}