#ifndef __CAR_ELASTOS_WALLET_H__
#define __CAR_ELASTOS_WALLET_H__

#ifndef _NO_INCLIST
#include "elastos.h"
using namespace Elastos;
#include "Elastos.CoreLibrary.h"

#endif // !_NO_INCLIST

#ifndef __UUNM_Elastos_Wallet_DEFINED__
#define __UUNM_Elastos_Wallet_DEFINED__
#define c_pElastos_WalletUunm "libElastos.Wallet.so"
#endif // __UUNM_Elastos_Wallet_DEFINED__

#ifndef __ECLSID_CWalletEnviroment_DEFINED__
#define __ECLSID_CWalletEnviroment_DEFINED__
static const _ELASTOS ClassID ECLSID_CWalletEnviroment = {
    {0xDDA12041,0x080C,0x2940,{0x6F,0x40,0xF9,0xCD,0x57,0xE7,0x0F,0x07}},
    (char *)c_pElastos_WalletUunm,
    0x49f744f4 };
#endif // __CLSID_CWalletEnviroment_DEFINED__

#ifndef __ECLSID_CWalletEnviromentClassObject_DEFINED__
#define __ECLSID_CWalletEnviromentClassObject_DEFINED__
static const _ELASTOS ClassID ECLSID_CWalletEnviromentClassObject = {
    {0x4CE12B41,0x080C,0x2940,{0x6F,0x40,0xF9,0xCD,0x57,0x27,0x03,0x93}},
    (char *)c_pElastos_WalletUunm,
    0x49f744f4 };
#endif // __CLSID_CWalletEnviromentClassObject_DEFINED__

#ifndef __EIID_ISubWalletListener_DEFINED__
#define __EIID_ISubWalletListener_DEFINED__
static const _ELASTOS InterfaceID EIID_ISubWalletListener = \
    {0x99922D18,0x8712,0x2097,{0xF9,0xBE,0xE8,0x5D,0xB1,0xF6,0x8D,0xC6}};
#endif // __IID_ISubWalletListener_DEFINED__

#ifndef __EIID_ISubWallet_DEFINED__
#define __EIID_ISubWallet_DEFINED__
static const _ELASTOS InterfaceID EIID_ISubWallet = \
    {0x856FE60A,0x8712,0x2097,{0xF9,0xBE,0xE8,0xFD,0x43,0xE8,0xCD,0xAC}};
#endif // __IID_ISubWallet_DEFINED__

#ifndef __EIID_IMainchainSubWallet_DEFINED__
#define __EIID_IMainchainSubWallet_DEFINED__
static const _ELASTOS InterfaceID EIID_IMainchainSubWallet = \
    {0xDB982A42,0x8592,0xA13E,{0x24,0x72,0xC0,0x51,0x02,0x04,0xA0,0x94}};
#endif // __IID_IMainchainSubWallet_DEFINED__

#ifndef __EIID_ISidechainSubWallet_DEFINED__
#define __EIID_ISidechainSubWallet_DEFINED__
static const _ELASTOS InterfaceID EIID_ISidechainSubWallet = \
    {0x2DD42B12,0xC712,0xA89E,{0xB9,0x92,0x6C,0xCC,0xE1,0x25,0x48,0xBE}};
#endif // __IID_ISidechainSubWallet_DEFINED__

#ifndef __EIID_IIdChainSubWallet_DEFINED__
#define __EIID_IIdChainSubWallet_DEFINED__
static const _ELASTOS InterfaceID EIID_IIdChainSubWallet = \
    {0x13872348,0x9592,0x7D21,{0x38,0xE0,0x28,0x01,0x02,0x50,0xCA,0x1B}};
#endif // __IID_IIdChainSubWallet_DEFINED__

#ifndef __EIID_IMasterWallet_DEFINED__
#define __EIID_IMasterWallet_DEFINED__
static const _ELASTOS InterfaceID EIID_IMasterWallet = \
    {0xB41AB74E,0x0592,0xCF45,{0x40,0x00,0x4A,0x79,0xE3,0x47,0x15,0x2B}};
#endif // __IID_IMasterWallet_DEFINED__

#ifndef __EIID_IMasterWalletManager_DEFINED__
#define __EIID_IMasterWalletManager_DEFINED__
static const _ELASTOS InterfaceID EIID_IMasterWalletManager = \
    {0xAEF2BD4B,0x0592,0xCF45,{0x40,0x00,0x4A,0x79,0xC3,0x82,0x20,0x3E}};
#endif // __IID_IMasterWalletManager_DEFINED__

#ifndef __EIID_IWalletEnviroment_DEFINED__
#define __EIID_IWalletEnviroment_DEFINED__
static const _ELASTOS InterfaceID EIID_IWalletEnviroment = \
    {0x2A125058,0x0812,0x2940,{0x6F,0x40,0xF9,0xCD,0x57,0xE7,0x8F,0x2D}};
#endif // __IID_IWalletEnviroment_DEFINED__

#ifndef __EIID_ICWalletEnviromentClassObject_DEFINED__
#define __EIID_ICWalletEnviromentClassObject_DEFINED__
static const _ELASTOS InterfaceID EIID_ICWalletEnviromentClassObject = \
    {0x7ED15E52,0x0312,0x8010,{0x52,0xDE,0x80,0xF2,0x9B,0xAF,0x4E,0x06}};
#endif // __IID_ICWalletEnviromentClassObject_DEFINED__

interface ISubWalletListener;
interface ISubWallet;
interface IMainchainSubWallet;
interface ISidechainSubWallet;
interface IIdChainSubWallet;
interface IMasterWallet;
interface IMasterWalletManager;
interface IWalletEnviroment;
interface ICWalletEnviromentClassObject;





#ifdef __ELASTOS_WALLET_USER_TYPE_H__
#include "Elastos.Wallet_user_type.h"
#endif
ELAPI _Impl_AcquireCallbackHandler(PInterface pServerObj, _ELASTOS REIID iid, PInterface *ppHandler);
ELAPI _Impl_CheckClsId(PInterface pServerObj, const _ELASTOS ClassID* pClassid, PInterface *ppServerObj);

CAR_INTERFACE("99922D18-8712-2097-F9BE-E85DB1F68DC6")
ISubWalletListener : public IInterface
{
    virtual CARAPI_(PInterface) Probe(
        /* [in] */ _ELASTOS REIID riid) = 0;

    static CARAPI_(ISubWalletListener*) Probe(PInterface pObj)
    {
        if (pObj == NULL) return NULL;
        return (ISubWalletListener*)pObj->Probe(EIID_ISubWalletListener);
    }

    static CARAPI_(ISubWalletListener*) Probe(IObject* pObj)
    {
        if (pObj == NULL) return NULL;
        return (ISubWalletListener*)pObj->Probe(EIID_ISubWalletListener);
    }

    static CARAPI_(ISubWalletListener*) QueryInterface(const Elastos::String& uid)
    {
        return NULL;
    }

    virtual CARAPI OnTransactionStatusChanged(
        /* [in] */ const _ELASTOS String& txid,
        /* [in] */ const _ELASTOS String& status,
        /* [in] */ const _ELASTOS String& desc,
        /* [in] */ _ELASTOS Int32 confirms) = 0;

};
CAR_INTERFACE("856FE60A-8712-2097-F9BE-E8FD43E8CDAC")
ISubWallet : public IInterface
{
    virtual CARAPI_(PInterface) Probe(
        /* [in] */ _ELASTOS REIID riid) = 0;

    static CARAPI_(ISubWallet*) Probe(PInterface pObj)
    {
        if (pObj == NULL) return NULL;
        return (ISubWallet*)pObj->Probe(EIID_ISubWallet);
    }

    static CARAPI_(ISubWallet*) Probe(IObject* pObj)
    {
        if (pObj == NULL) return NULL;
        return (ISubWallet*)pObj->Probe(EIID_ISubWallet);
    }

    static CARAPI_(ISubWallet*) QueryInterface(const Elastos::String& uid)
    {
        return NULL;
    }

    virtual CARAPI GetChainId(
        /* [out] */ _ELASTOS String * id) = 0;

    virtual CARAPI GetBalanceInfo(
        /* [out] */ _ELASTOS String * balanceInfoJson) = 0;

    virtual CARAPI GetBalance(
        /* [out] */ _ELASTOS Int64 * balance) = 0;

    virtual CARAPI CreateAddress(
        /* [out] */ _ELASTOS String * address) = 0;

    virtual CARAPI GetAllAddress(
        /* [in] */ _ELASTOS Int32 start,
        /* [in] */ _ELASTOS Int32 count,
        /* [out] */ _ELASTOS String * addressesJson) = 0;

    virtual CARAPI GetBalanceWithAddress(
        /* [in] */ const _ELASTOS String& address,
        /* [out] */ _ELASTOS Int64 * balance) = 0;

    virtual CARAPI AddCallback(
        /* [in] */ ISubWalletListener * subCallback) = 0;

    virtual CARAPI RemoveCallback(
        /* [in] */ ISubWalletListener * subCallback) = 0;

    virtual CARAPI SendTransaction(
        /* [in] */ const _ELASTOS String& fromAddress,
        /* [in] */ const _ELASTOS String& toAddress,
        /* [in] */ _ELASTOS Int64 amount,
        /* [in] */ _ELASTOS Int64 fee,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [in] */ const _ELASTOS String& memo,
        /* [out] */ _ELASTOS String * txidJson) = 0;

    virtual CARAPI CreateMultiSignAddress(
        /* [in] */ const _ELASTOS String& multiPublicKeyJson,
        /* [in] */ _ELASTOS Int32 totalSignNum,
        /* [in] */ _ELASTOS Int32 requiredSignNum,
        /* [out] */ _ELASTOS String * multiSignAddress) = 0;

    virtual CARAPI GenerateMultiSignTransaction(
        /* [in] */ const _ELASTOS String& fromAddress,
        /* [in] */ const _ELASTOS String& toAddress,
        /* [in] */ _ELASTOS Int64 amount,
        /* [in] */ _ELASTOS Int64 fee,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [in] */ const _ELASTOS String& memo,
        /* [out] */ _ELASTOS String * transactionJson) = 0;

    virtual CARAPI SendRawTransaction(
        /* [in] */ const _ELASTOS String& transactionJson,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [out] */ _ELASTOS String * txidJson) = 0;

    virtual CARAPI GetAllTransaction(
        /* [in] */ _ELASTOS Int32 start,
        /* [in] */ _ELASTOS Int32 count,
        /* [in] */ const _ELASTOS String& addressOrTxid,
        /* [out] */ _ELASTOS String * transactionListJson) = 0;

    virtual CARAPI Sign(
        /* [in] */ const _ELASTOS String& message,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [out] */ _ELASTOS String * signature) = 0;

    virtual CARAPI CheckSign(
        /* [in] */ const _ELASTOS String& address,
        /* [in] */ const _ELASTOS String& message,
        /* [in] */ const _ELASTOS String& signature,
        /* [out] */ _ELASTOS String * resultJson) = 0;

};
CAR_INTERFACE("DB982A42-8592-A13E-2472-C0510204A094")
IMainchainSubWallet : public IInterface
{
    virtual CARAPI_(PInterface) Probe(
        /* [in] */ _ELASTOS REIID riid) = 0;

    static CARAPI_(IMainchainSubWallet*) Probe(PInterface pObj)
    {
        if (pObj == NULL) return NULL;
        return (IMainchainSubWallet*)pObj->Probe(EIID_IMainchainSubWallet);
    }

    static CARAPI_(IMainchainSubWallet*) Probe(IObject* pObj)
    {
        if (pObj == NULL) return NULL;
        return (IMainchainSubWallet*)pObj->Probe(EIID_IMainchainSubWallet);
    }

    static CARAPI_(IMainchainSubWallet*) QueryInterface(const Elastos::String& uid)
    {
        return NULL;
    }

    virtual CARAPI SendDepositTransaction(
        /* [in] */ const _ELASTOS String& fromAddress,
        /* [in] */ const _ELASTOS String& toAddress,
        /* [in] */ _ELASTOS Int64 amount,
        /* [in] */ const _ELASTOS String& sidechainAccountsJson,
        /* [in] */ const _ELASTOS String& sidechainAmountsJson,
        /* [in] */ const _ELASTOS String& sidechainIndexsJson,
        /* [in] */ _ELASTOS Int64 fee,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [in] */ const _ELASTOS String& memo,
        /* [out] */ _ELASTOS String * txidJson) = 0;

};
CAR_INTERFACE("2DD42B12-C712-A89E-B992-6CCCE12548BE")
ISidechainSubWallet : public IInterface
{
    virtual CARAPI_(PInterface) Probe(
        /* [in] */ _ELASTOS REIID riid) = 0;

    static CARAPI_(ISidechainSubWallet*) Probe(PInterface pObj)
    {
        if (pObj == NULL) return NULL;
        return (ISidechainSubWallet*)pObj->Probe(EIID_ISidechainSubWallet);
    }

    static CARAPI_(ISidechainSubWallet*) Probe(IObject* pObj)
    {
        if (pObj == NULL) return NULL;
        return (ISidechainSubWallet*)pObj->Probe(EIID_ISidechainSubWallet);
    }

    static CARAPI_(ISidechainSubWallet*) QueryInterface(const Elastos::String& uid)
    {
        return NULL;
    }

    virtual CARAPI SendWithdrawTransaction(
        /* [in] */ const _ELASTOS String& fromAddress,
        /* [in] */ const _ELASTOS String& toAddress,
        /* [in] */ _ELASTOS Int64 amount,
        /* [in] */ const _ELASTOS String& mainchainAccountsJson,
        /* [in] */ const _ELASTOS String& mainchainAmountsJson,
        /* [in] */ const _ELASTOS String& mainchainIndexsJson,
        /* [in] */ _ELASTOS Int64 fee,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [in] */ const _ELASTOS String& memo,
        /* [out] */ _ELASTOS String * txidJson) = 0;

};
CAR_INTERFACE("13872348-9592-7D21-38E0-28010250CA1B")
IIdChainSubWallet : public IInterface
{
    virtual CARAPI_(PInterface) Probe(
        /* [in] */ _ELASTOS REIID riid) = 0;

    static CARAPI_(IIdChainSubWallet*) Probe(PInterface pObj)
    {
        if (pObj == NULL) return NULL;
        return (IIdChainSubWallet*)pObj->Probe(EIID_IIdChainSubWallet);
    }

    static CARAPI_(IIdChainSubWallet*) Probe(IObject* pObj)
    {
        if (pObj == NULL) return NULL;
        return (IIdChainSubWallet*)pObj->Probe(EIID_IIdChainSubWallet);
    }

    static CARAPI_(IIdChainSubWallet*) QueryInterface(const Elastos::String& uid)
    {
        return NULL;
    }

    virtual CARAPI SendIdTransaction(
        /* [in] */ const _ELASTOS String& fromAddress,
        /* [in] */ const _ELASTOS String& toAddress,
        /* [in] */ _ELASTOS Int64 amount,
        /* [in] */ const _ELASTOS String& payloadJson,
        /* [in] */ const _ELASTOS String& programJson,
        /* [in] */ _ELASTOS Int64 fee,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [in] */ const _ELASTOS String& memo,
        /* [out] */ _ELASTOS String * result) = 0;

};
CAR_INTERFACE("B41AB74E-0592-CF45-4000-4A79E347152B")
IMasterWallet : public IInterface
{
    virtual CARAPI_(PInterface) Probe(
        /* [in] */ _ELASTOS REIID riid) = 0;

    static CARAPI_(IMasterWallet*) Probe(PInterface pObj)
    {
        if (pObj == NULL) return NULL;
        return (IMasterWallet*)pObj->Probe(EIID_IMasterWallet);
    }

    static CARAPI_(IMasterWallet*) Probe(IObject* pObj)
    {
        if (pObj == NULL) return NULL;
        return (IMasterWallet*)pObj->Probe(EIID_IMasterWallet);
    }

    static CARAPI_(IMasterWallet*) QueryInterface(const Elastos::String& uid)
    {
        return NULL;
    }

    virtual CARAPI GetId(
        /* [out] */ _ELASTOS String * id) = 0;

    virtual CARAPI GetAllSubWallets(
        /* [out, callee] */ _ELASTOS ArrayOf<ISubWallet *> ** subWallets) = 0;

    virtual CARAPI CreateSubWallet(
        /* [in] */ const _ELASTOS String& chainID,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [in] */ _ELASTOS Boolean singleAddress,
        /* [in] */ _ELASTOS Int64 feePerKb,
        /* [out] */ ISubWallet ** subWallet) = 0;

    virtual CARAPI RecoverSubWallet(
        /* [in] */ const _ELASTOS String& chainID,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [in] */ _ELASTOS Boolean singleAddress,
        /* [in] */ _ELASTOS Int32 limitGap,
        /* [in] */ _ELASTOS Int64 feePerKb,
        /* [out] */ ISubWallet ** subWallet) = 0;

    virtual CARAPI DestroyWallet(
        /* [in] */ ISubWallet * wallet) = 0;

    virtual CARAPI GetPublicKey(
        /* [out] */ _ELASTOS String * publicKey) = 0;

    virtual CARAPI Sign(
        /* [in] */ const _ELASTOS String& message,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [out] */ _ELASTOS String * result) = 0;

    virtual CARAPI CheckSign(
        /* [in] */ const _ELASTOS String& publicKey,
        /* [in] */ const _ELASTOS String& message,
        /* [in] */ const _ELASTOS String& signature,
        /* [out] */ _ELASTOS String * resultJson) = 0;

    virtual CARAPI IsAddressValid(
        /* [in] */ const _ELASTOS String& address,
        /* [out] */ _ELASTOS Boolean * valid) = 0;

    virtual CARAPI GenerateMnemonic(
        /* [out] */ _ELASTOS String * mnemonic) = 0;

    virtual CARAPI GetSupportedChains(
        /* [out, callee] */ _ELASTOS ArrayOf<_ELASTOS String> ** supportedChains) = 0;

    virtual CARAPI ChangePassword(
        /* [in] */ const _ELASTOS String& oldPassword,
        /* [in] */ const _ELASTOS String& newPassword) = 0;

    virtual CARAPI ResetAddressCache(
        /* [in] */ const _ELASTOS String& payPassword) = 0;

};
CAR_INTERFACE("AEF2BD4B-0592-CF45-4000-4A79C382203E")
IMasterWalletManager : public IInterface
{
    virtual CARAPI_(PInterface) Probe(
        /* [in] */ _ELASTOS REIID riid) = 0;

    static CARAPI_(IMasterWalletManager*) Probe(PInterface pObj)
    {
        if (pObj == NULL) return NULL;
        return (IMasterWalletManager*)pObj->Probe(EIID_IMasterWalletManager);
    }

    static CARAPI_(IMasterWalletManager*) Probe(IObject* pObj)
    {
        if (pObj == NULL) return NULL;
        return (IMasterWalletManager*)pObj->Probe(EIID_IMasterWalletManager);
    }

    static CARAPI_(IMasterWalletManager*) QueryInterface(const Elastos::String& uid)
    {
        return NULL;
    }

    virtual CARAPI CreateMasterWallet(
        /* [in] */ const _ELASTOS String& masterWalletId,
        /* [in] */ const _ELASTOS String& language,
        /* [out] */ IMasterWallet ** masterWallet) = 0;

    virtual CARAPI InitializeMasterWallet(
        /* [in] */ const _ELASTOS String& masterWalletId,
        /* [in] */ const _ELASTOS String& mnemonic,
        /* [in] */ const _ELASTOS String& phrasePassword,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [out] */ _ELASTOS Boolean * success) = 0;

    virtual CARAPI GetAllMasterWallets(
        /* [out, callee] */ _ELASTOS ArrayOf<IMasterWallet *> ** wallets) = 0;

    virtual CARAPI DestroyWallet(
        /* [in] */ const _ELASTOS String& masterWalletId) = 0;

    virtual CARAPI ImportWalletWithKeystore(
        /* [in] */ const _ELASTOS String& masterWalletId,
        /* [in] */ const _ELASTOS String& keystorePath,
        /* [in] */ const _ELASTOS String& backupPassword,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [in] */ const _ELASTOS String& phrasePassword,
        /* [out] */ IMasterWallet ** masterWallet) = 0;

    virtual CARAPI ImportWalletWithMnemonic(
        /* [in] */ const _ELASTOS String& masterWalletId,
        /* [in] */ const _ELASTOS String& mnemonic,
        /* [in] */ const _ELASTOS String& phrasePassword,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [in] */ const _ELASTOS String& language,
        /* [out] */ IMasterWallet ** masterWallet) = 0;

    virtual CARAPI ExportWalletWithKeystore(
        /* [in] */ IMasterWallet * masterWallet,
        /* [in] */ const _ELASTOS String& backupPassword,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [in] */ const _ELASTOS String& keystorePath) = 0;

    virtual CARAPI ExportWalletWithMnemonic(
        /* [in] */ IMasterWallet * masterWallet,
        /* [in] */ const _ELASTOS String& payPassword,
        /* [out] */ _ELASTOS String * mnemonic) = 0;

};
CAR_INTERFACE("2A125058-0812-2940-6F40-F9CD57E78F2D")
IWalletEnviroment : public IInterface
{
    virtual CARAPI_(PInterface) Probe(
        /* [in] */ _ELASTOS REIID riid) = 0;

    static CARAPI_(IWalletEnviroment*) Probe(PInterface pObj)
    {
        if (pObj == NULL) return NULL;
        return (IWalletEnviroment*)pObj->Probe(EIID_IWalletEnviroment);
    }

    static CARAPI_(IWalletEnviroment*) Probe(IObject* pObj)
    {
        if (pObj == NULL) return NULL;
        return (IWalletEnviroment*)pObj->Probe(EIID_IWalletEnviroment);
    }

    static CARAPI_(IWalletEnviroment*) QueryInterface(const Elastos::String& uid)
    {
        return NULL;
    }

    virtual CARAPI InitializeRootPath(
        /* [in] */ const _ELASTOS String& rootPath) = 0;

    virtual CARAPI GetRootPath(
        /* [out] */ _ELASTOS String * path) = 0;

    virtual CARAPI GetMasterWalletManager(
        /* [out] */ IMasterWalletManager ** walletMgr) = 0;

    virtual CARAPI SaveConfigs() = 0;

};
CAR_INTERFACE("7ED15E52-0312-8010-52DE-80F29BAF4E06")
ICWalletEnviromentClassObject : public IClassObject
{
    virtual CARAPI_(PInterface) Probe(
        /* [in] */ _ELASTOS REIID riid) = 0;

    static CARAPI_(ICWalletEnviromentClassObject*) Probe(PInterface pObj)
    {
        if (pObj == NULL) return NULL;
        return (ICWalletEnviromentClassObject*)pObj->Probe(EIID_ICWalletEnviromentClassObject);
    }

    static CARAPI_(ICWalletEnviromentClassObject*) Probe(IObject* pObj)
    {
        if (pObj == NULL) return NULL;
        return (ICWalletEnviromentClassObject*)pObj->Probe(EIID_ICWalletEnviromentClassObject);
    }

    static CARAPI_(ICWalletEnviromentClassObject*) QueryInterface(const Elastos::String& uid)
    {
        return NULL;
    }

    virtual CARAPI CreateObjectWithDefaultCtor(
        /* [out] */ IInterface ** newObj) = 0;

};
#ifndef _INSIDE_ELASTOS_WALLET_
class CWalletEnviroment
{
public:
    static _ELASTOS ECode AcquireSingleton(
        /* [out] */ IWalletEnviroment** __object)
    {
        return _CObject_CreateInstance(ECLSID_CWalletEnviroment, RGM_SAME_DOMAIN, EIID_IWalletEnviroment, (PInterface*)__object);
    }

    static _ELASTOS ECode AcquireSingleton(
        /* [out] */ IObject** __object)
    {
        return _CObject_CreateInstance(ECLSID_CWalletEnviroment, RGM_SAME_DOMAIN, EIID_IObject, (PInterface*)__object);
    }

    static _ELASTOS ECode AcquireSingleton(
        /* [out] */ Elastos::Core::ISynchronize** __object)
    {
        return _CObject_CreateInstance(ECLSID_CWalletEnviroment, RGM_SAME_DOMAIN, Elastos::Core::EIID_ISynchronize, (PInterface*)__object);
    }

    static _ELASTOS ECode AcquireSingleton(
        /* [out] */ IWeakReferenceSource** __object)
    {
        return _CObject_CreateInstance(ECLSID_CWalletEnviroment, RGM_SAME_DOMAIN, EIID_IWeakReferenceSource, (PInterface*)__object);
    }

};
#endif // _INSIDE_ELASTOS_WALLET_


#endif // __CAR_ELASTOS_WALLET_H__
