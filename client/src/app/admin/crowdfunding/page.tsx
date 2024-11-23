'use client';

import CrowdfundingAdminTable from "@/app/components/CrowdfundingAdminTable";
import { SearchOutlined } from "@mui/icons-material";
import { Box, CircularProgress, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Input } from "antd";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useGetCrowdfundings, useGetSingleCrowdfunding, useUpdateCrowdfunding } from "../hooks/crowdFuncdingHook/useCrowdFunding";
import { useSession } from "next-auth/react";
import MModal from "@/app/components/Modal";
import InputField from "@/app/components/InputField";
import Select from "react-select";
import { customStyles } from "@/constant/customStyles";
import { stateLga } from "@/constant/state";
import useBank from "@/app/hooks/useBank";
import { banks } from "@/constant/bank";
import Toastify from "@/app/components/ToastifySnack";
import { NButton } from "@/app/components/PButton";
import ImageUploader from "@/app/components/ImageUploader";
import { useAtom } from "jotai";
import { selectedImageArrayAtom } from "@/lib/atoms";

const items = [
  "Pending",
  "Active",
  "Inactive",
  "Done",
  "Most Liked"
]

interface IProps {
  title: string;
  state: string;
  lga: string;
  description: string;
  fundraisingFor: string;
  accountNumber: string;
  bank: string;
  accountName: string;
  amountNeeded: string;
  bankCode: string;
  address: string;
}

export default function page() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentItem, setCurrentItem] = useState<string>('Pending');
  const [crowdfunding, setCrowdfunding] = useState<any>([]);
  const getCrowedFundingMutation = useGetCrowdfundings();
  const {data: session} = useSession();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [campaignId, setCampaignId] = useState<string>('');
  const getSingleCrowdMutation = useGetSingleCrowdfunding();
  const [campaignData, setCampaignData] = useState<IProps>({
    title: '',
    state: '',
    lga: '',
    description: '',
    fundraisingFor: '',
    accountNumber: '',
    bank: '',
    accountName: '',
    amountNeeded: '',
    bankCode: '',
    address: ''
  });
  const [state, setState] = useState([]);
  const [bank, setBank] = useState([]);
  const [district, setDistrict] = useState<any[]>([]);
  const { verifyBank, verifyBankIsLoading, verified } = useBank();
  const hasMounted = useRef(false);
  const [image, setImage] = useAtom(selectedImageArrayAtom);
  const [campaignImg, setCampaignImg] = useState<string>('');

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const updateCrowdfundingMutation = useUpdateCrowdfunding();

  const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
    setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
    setIsError(type === 'error');
    setIsSuccess(type === 'success');
    setOpen(true);
  };

  const filteredData =
    crowdfunding &&
    crowdfunding.filter((item: any) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.amountNeeded.includes(searchQuery) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  const handleUpdateCampaign = async () => {
    if(!session?.user) {
        handleOpenNotification('error', '', 'Please sign in to proceed.')
        return;
    }

    if(campaignData.accountName === '' || campaignData.accountNumber === '' || campaignData.bank === '') {
      handleOpenNotification('error', '', 'Please fill the beneficiary account details.')
      return;
    }

    const reqObject = {
      ...campaignData,
      image: image[0],
      crowdFundingId: campaignId
    }
    console.log(reqObject, 'reqObject')
    await updateCrowdfundingMutation.mutateAsync(reqObject, {
      onSuccess: (response: any) => {
        handleOpenNotification('success', response.message)
          
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  const handleDistrict = (value: any) => {
    if (!value) {
      return;
    }
    const newData = Object.entries(stateLga).find(
      (_items) => _items[0] === value
    );

    if (!newData) {
      return;
    }
    const districtArray = newData[1]?.map(
      (item) => {
        return {
          value: item,
          label: item,
        };
      }
    );
    setDistrict(districtArray);
};

  const handleClose = () => {
    setCampaignId('')
    setOpenEditModal(false)
    setCampaignData({
      title: '',
      state: '',
      lga: '',
      description: '',
      fundraisingFor: '',
      accountNumber: '',
      bank: '',
      accountName: '',
      amountNeeded: '',
      bankCode: '',
      address: ''
    })
    setImage([])
  }

  const handleGetSingleCampaign = async () => {
    await getSingleCrowdMutation.mutateAsync(campaignId, {
      onSuccess: (response: any) => {
        const res = response.result
        setCampaignData({
          title: res.title,
          state: res.location?.state,
          lga: res.location?.lga,
          fundraisingFor: res.fundraisingFor,
          description: res.description,
          accountNumber: res.account?.accountNumber,
          bank: res.account?.bank,
          accountName: res.account?.accountName,
          amountNeeded: res.amountNeeded,
          bankCode: res.account?.bankCode,
          address: res.address
        })
        setCampaignImg(res.image)
      }
    })
  }

  useEffect(() => {
    if(getCrowedFundingMutation.isSuccess) {
      if(currentItem === "Pending") {
        const filteredData = getCrowedFundingMutation.data?.results?.filter((crowdCampaign) => crowdCampaign.status === "pending");
        setCrowdfunding(filteredData)
      } else if(currentItem === "Active") {
        const filteredData = getCrowedFundingMutation.data?.results?.filter((crowdCampaign) => crowdCampaign.status === "active");
        setCrowdfunding(filteredData)
      } else if(currentItem === "Inactive") {
        const filteredData = getCrowedFundingMutation.data?.results?.filter((crowdCampaign) => crowdCampaign.status === "inactive");
        setCrowdfunding(filteredData)
      } else if(currentItem === "Most Liked") {
          const filteredData = getCrowedFundingMutation.data?.results
          ?.filter((crowdCampaign) => crowdCampaign.status === "active")
          ?.sort((a, b) => b.likes.length - a.likes.length);
        
          setCrowdfunding(filteredData);
      } else {
        const filteredData = getCrowedFundingMutation.data?.results?.filter((crowdCampaign) => crowdCampaign.status === "done");
        setCrowdfunding(filteredData)
      }
    }
  },[currentItem, getCrowedFundingMutation.isSuccess]);

  useEffect(() => {
    const handleGetCrowd = async () => {
      await getCrowedFundingMutation.mutateAsync({})
    }
    handleGetCrowd()
  },[session]);

  useEffect(() => {
    if(campaignId !== '' && openEditModal) {
      handleGetSingleCampaign()
    }
  },[campaignId, openEditModal]);

  useEffect(() => {
    let stateArray: any = [];
    const newData = Object.entries(stateLga);

    newData.map((item, index) => {
      stateArray.push({
        value: item[0],
        label: item[0],
      });
    });
    setState(stateArray);
  }, []);

  useEffect(() => {
    if(banks) {
        let bankArray: any = [];

        banks?.map((item: any, index: number) => {
            bankArray.push({
                value: item.name,
                label: item.name,
                code: item.code
            });
        });

        setBank(bankArray);
    }
    
  }, [banks]);

  useEffect(() => {
    const handleVeriBank = async () => {
        if (campaignData.accountNumber.length === 10 && campaignData.bankCode) {
            try {
                await verifyBank.mutateAsync({
                    accountNumber: campaignData.accountNumber,
                    bankCode: campaignData.bankCode
                });
            } catch (error) {
                console.error('Bank verification failed', error);
            }
        }
    };

    if (hasMounted.current) {
      handleVeriBank();
    } else {
      hasMounted.current = true;
    }
  }, [campaignData.accountNumber, campaignData.bankCode]);

  useEffect(() => {
      if(verifyBank.isError) {
        handleOpenNotification('error', '', 'Could not resolve account name. Please confirm the account number and bank.')
      }
  },[verifyBank.isError])

  useEffect(() => {
      if(verifyBank.isSuccess) {
          setCampaignData({...campaignData, accountName: verified})
      }
  },[verifyBank.isSuccess]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 4
      }}
    >
      <Typography variant={ md ? "h5" : "h4" } mb={4}>
        Crowdfunding
      </Typography>

      <Box
        sx={{
          display: 'flex',
          p: 1,
          border: `1px solid ${theme.palette.secondary.lighter}`,
          bgcolor: theme.palette.background.default,
          height: 'auto',
          borderRadius: theme.borderRadius.sm,
          mt: 1,
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            gap: 4, mt: 2,
            alignItems: 'center',
            px: 2, mb: 2,
            flexDirection: sm ? 'column' : 'row'
          }}
        >
          <Box 
            sx={{
              width: sm ? "100%" : "70%",
              display: 'flex',
              gap: 4
            }}
          >
            {items.map((item: string, index: number) => (
              <Typography variant={ currentItem === item ? "labelsm" : "paragraphsm"} 
                key={index}
                onClick={() => setCurrentItem(item)}
                sx={{
                  borderBottom: currentItem === item ? `2px solid ${theme.palette.primary.main}` : 'none',
                  color: currentItem === item
                    ? theme.palette.primary.main
                    : theme.palette.secondary.light,
                  cursor: 'pointer',
                  height: '1.6rem'
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
          <Box sx={{width: sm ? "100%" : "30%"}}>
            <Input
              size="large" 
              placeholder="Search" 
              prefix={<SearchOutlined sx={{color: theme.palette.secondary.lighter}}/>} 
              onChange={handleSearchChange}
            />
          </Box>
        </Box>

        <MModal
          onClose={handleClose}
          open={openEditModal}
          width={sm ? '80%' : '60%'}
          height='auto'
          showCloseIcon={true}
          onClickOut={false}
        >
          <Box className="flex flex-col py-5 px-10">
            <Box
              sx={{
                width: '100%',
                mt: 3, gap: 1,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="labelxl" mb={1}>
                Update Campaign Info
              </Typography>
              <Divider sx={{mb: 4}}/>

              <Box mb={2} display={'flex'} flexDirection={'column'}>
                <Typography variant="labellg">
                  Campign Image
                </Typography>
                <img
                  src={campaignImg 
                        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${campaignImg}` : '/crowd2.png'}
                  alt='campaign image'
                  crossOrigin="anonymous"
                  style={{
                    width: '50%',
                    height: '200px',
                    borderTopLeftRadius: theme.borderRadius.sm,
                    borderTopRightRadius: theme.borderRadius.sm
                  }}
                />
              </Box>
              
              <InputField
                label="Fundraiser Title"
                placeholder="Enter fundraiser title"
                isBorder={true}
                labelStyle={{
                  fontSize: theme.typography.labelbase.fontSize,
                  fontWeight: 500
                }}
                value={campaignData.title}
                onChange={(e)=>setCampaignData({...campaignData, title: e.target.value})}
              />

              <InputField
                label="Campaign Beneficiary"
                placeholder="Full name"
                isBorder={true}
                labelStyle={{
                    fontSize: theme.typography.labelbase.fontSize,
                    fontWeight: 500
                }}
                value={campaignData.fundraisingFor}
                onChange={(e)=>setCampaignData({...campaignData, fundraisingFor: e.target.value})}
              />

              <InputField
                placeholder="Your starting goal"
                label="Amount Needed"
                isBorder={true}
                labelStyle={{
                  fontSize: theme.typography.labelxs.fontSize,
                  fontWeight: theme.typography.labelxs.fontWeight
                }}
                onChange={(e) => setCampaignData({...campaignData, amountNeeded: e.target.value})}
                value={campaignData.amountNeeded}
                startAdornment={(
                  <Typography>
                    ₦
                  </Typography>
                )}
              />

              <Box
                sx={{
                    display: 'flex',
                    flexDirection: sm ? 'column' : 'row',
                    width: '100%', gap: 4
                }}
              >
                <Box
                    sx={{
                        width: sm ? '100%' : '50%'
                    }}
                >
                    <InputField
                        placeholder="account number"
                        label="Account number"
                        isBorder={true}
                        labelStyle={{
                            fontSize: theme.typography.labelxs.fontSize,
                            fontWeight: theme.typography.labelxs.fontWeight
                        }}
                        onChange={(e) => setCampaignData({...campaignData, accountNumber: e.target.value})}
                        value={campaignData.accountNumber}
                        endAdornment={(
                            <>
                                { verifyBankIsLoading && <CircularProgress size='14px'/> }
                            </>
                        )}
                    />
                </Box>
                <Box
                    sx={{
                        width: sm ? '100%' : '50%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography
                        sx={{
                          fontSize: theme.typography.labelxs.fontSize,
                          fontWeight: theme.typography.labelxs.fontWeight,
                          mb: '7px'
                        }}
                    >
                        Bank
                    </Typography>
                    <Select
                        className="w-full h-10 font-light"
                        options={bank}
                        styles={customStyles}
                        placeholder="Choose bank"
                        name="bank"
                        onChange={(item) => {
                            //@ts-ignore
                            setCampaignData({...campaignData, bank: String(item?.value), bankCode: item?.code})
                        }}
                        value={{
                            value: campaignData.bank,
                            label: campaignData.bank,
                        }}
                    />
                </Box>
              </Box>

              <Box  
                sx={{
                    width: '100%'
                }}
              >
                <InputField
                    placeholder="account name"
                    label="Account name"
                    isBorder={true}
                    labelStyle={{
                        fontSize: theme.typography.labelxs.fontSize,
                        fontWeight: theme.typography.labelxs.fontWeight
                    }}
                    disabled
                    // onChange={(e) => setData({...data, accountName: verified})}
                    value={verified || campaignData.accountName}
                />
              </Box>

              <InputField
                label="Address"
                placeholder="Enter address"
                isBorder={true}
                labelStyle={{
                  fontSize: theme.typography.labelbase.fontSize,
                  fontWeight: 500
                }}
                multiline={true}
                rows={3}
                value={campaignData.address}
                onChange={(e)=>setCampaignData({...campaignData, address: e.target.value})}
              />

              <Box
                sx={{
                    display: 'flex',
                    flexDirection:'column',
                    py: 2
                }}
              >

                <Typography
                    sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        fontWeight: theme.typography.labelxs.fontWeight,
                    }}
                >
                    Where are you located?
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: sm ? 'column' : 'row',
                        gap: 3, 
                        py: 2
                    }}
                >
                    <Box
                        sx={{
                            width: sm ? '100%' : '50%'
                        }}
                    >
                        <Select
                          className="w-full h-10 font-light"
                          options={state}
                          styles={customStyles}
                          placeholder="Choose state"
                          name="state"
                          onChange={(item) => {
                            handleDistrict(String(item?.value));
                            setCampaignData({...campaignData, state: String(item?.value)})
                          }}
                          value={{
                            value: campaignData.state,
                            label: campaignData.state
                          }}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: sm ? '100%' : '50%'
                        }}
                    >
                      <Select
                        className="w-full h-10 font-light"
                        options={district}
                        styles={customStyles}
                        placeholder="Choose lga"
                        name="lga"
                        onChange={(item) => {
                          setCampaignData({...campaignData, lga: String(item?.value)})
                        }}
                        value={{
                          value: campaignData.lga,
                          label: campaignData.lga
                        }}
                      />
                    </Box>
                </Box>
              </Box>

              <InputField
                label="description"
                placeholder="Enter description"
                isBorder={true}
                labelStyle={{
                  fontSize: theme.typography.labelbase.fontSize,
                  fontWeight: 500
                }}
                multiline={true}
                rows={3}
                value={campaignData.description}
                onChange={(e)=>setCampaignData({...campaignData, description: e.target.value})}
              />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant='labelbase' mb={2}>
                    Campaign Image
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    border: `3px dashed ${theme.palette.secondary.lighter}`,
                    borderRadius: theme.borderRadius.sm,
                    backgroundColor: "white",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <ImageUploader
                    label={''}
                    showImageName={true}
                    allowMultiple={false}
                    showDomiImage={false}
                    spacebtwimgtypes={-2}
                    title={false}
                  />
                </Box>
              </Box>

              <Box display={'flex'} gap={2}>
                <NButton
                  bkgcolor={theme.palette.primary.main}
                  textcolor='white'
                  width='100%'
                  onClick={handleUpdateCampaign}
                >
                  {updateCrowdfundingMutation.isLoading ? 'Loading...' : 'Submit'}
                </NButton>
                <NButton
                  bkgcolor={theme.palette.state.error}
                  textcolor='white'
                  width='100%'
                  onClick={handleClose}
                  hovercolor="red"
                >
                  Close
                </NButton>
              </Box>
              
            </Box>
          </Box>
        </MModal>

        <CrowdfundingAdminTable
          //@ts-ignore
          data={filteredData}
          setOpenEditModal={setOpenEditModal}
          setCampaignId={setCampaignId}
          currentItem={currentItem}
        />

        <Toastify
          open={open}
          onClose={() => setOpen(false)}
          message={message}
          error={isError}
          success={isSuccess}
      />
      </Box>
    </Box>
  )
}
