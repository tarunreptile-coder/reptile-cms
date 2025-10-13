/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import {
    AdminUserRoutes,
    ProtectedRoutes,
    SuperUserRoutes,
} from '@Reptile/Components/Atoms';
import { StoreProvider } from '@Reptile/Contexts';
import {
    AccountConfirmationPage,
    EditThemesPage,
    IssuePage,
    LoginPage,
    OrganizationPage,
    PublicationPage,
    PublisherPage,
    RegisterPage,
    SectionPage,
    TemplatePage,
    WysiwygPage,
    PrototypePage,
    AccountsPage,
    ThemesManagerPage,
    AppBuildPage,
    AccountSettings,
    ForgetPasswordPage,
    ResetPasswordPage,
    PaymentPage,
    Page404,
    Page500,
    FinishPage,
    PlanPage,
    BillingHistoryPage,
} from '@Reptile/Components/Pages';

import TawkMessenger from './components/Molecules/TawkTo/TawkMessenger';

import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.scss';
import { useVersionCheck } from './Hooks';
import { configure } from "mobx";
import { setScriptKey } from '@progress/kendo-licensing';

setScriptKey("141j044b041h541j4i1d542e581e4i1i4g260i2k0f2e0d300e2g032d0228195113540841081f064f47564b544153495737613a5g404c06263j611823131b0d523k283h2b4229412c0f2d011e0f230k224k2k4b4k22335h3g2d3j2b023725350c4j1f4f3j1a5b330g4225124f22322b022c350d4g410c5d171f142h123d550b592e3h285c116126450j3110561h1245265g0a3423613b1k511e1048264e0e53215k044h28321h592b4529502k0b58215f2g5j135c14591j613b1b5h1k4f465b0h4k1d3920133b1h560551033h4c2c5g215543013j043f08450c33124a2d311k3e05501935124a4k1c3g184g053j0k4j24382645034729351g5k2d4b2h5j0g4i04541f0i4b0b4k450k602h0b350g32572j60094c04480i60185d15582e3j2j400e462j0d31043e5g2c4e1i3k185e17244f1b0g1b5h0g3b1e562e580639175i0f413043304i0b492d542g4c0a360h5d350d4g0j5h134b294503404d16320k5f0j46264b2c5f224d11440c4g08370h401b5h0g362i590b2h0b37224i0c310k5a0a360i47255c1c3b295j2e3k1f5144092f5b370j1h5601271a4855174b135b013d2e432c5a2e5h295i2e4j111b355a0g1d5d024315361c3c5h43295d3322013b23400b592g0a3d0e5i1f4k1i3j05411736113j104f234d0j1h5340035d2h3b074300404j094a1i35065303514653155j124e214b2b3j2i0426052b3j2h5615613801360c55114d4407492k063f225k235h0e52204d0b5a143h4k1e113f15601040142039034k49204d2748300651254g0a3224312f471k5i0i4g28041k4j2b45083f2g6109603b2210561c0j3i4k1c3k135d0g440f3h1149095f0f321331064h083i0i3e24312411601i424d1e5e13541325544b0h310g1b532b5115512851441a1i3711350b3e0a370c421056012e5h0a281a442d37015a2j381k331f5e460i5i2649193j083f204g2d4e034k014j105a092g0d5k244h29022c3221331i3k5227034e153g16401g3c1k4c0b4g2640004i1j3c0j4618603708522g5g3c164b234k4a1j141b59330j4b112h3b1a53162f4g2f");


configure({enforceActions: "never"});

const routes = (
    <>
        <Route path='' element={<Navigate to='/content' />} />
        <Route path='404' element={<Page404 />} />
        <Route path='500' element={<Page500 />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='forget-password' element={<ForgetPasswordPage />} />
        <Route path='reset-password' element={<ResetPasswordPage />} />
        <Route
            path='account-confirmation'
            element={<AccountConfirmationPage />}
        />
        <Route path='register' element={<RegisterPage />} />
        {/* <Route path="redirect-to-portal" element={<RedirectToPortal />} />
        <Route path="develop" element={<PublicationAppSettings />} /> */}
        <Route element={<ProtectedRoutes />}>
            <Route path='themes' element={<ThemesManagerPage />} />
            <Route path='edit-themes/:entityId' element={<EditThemesPage />} />
            <Route path='content' element={<OrganizationPage />} />
            <Route path='account-settings' element={<AccountSettings />} />
            <Route path='account' element={<AccountsPage />} />
            <Route path='payment' element={<PaymentPage />} />
            <Route path='plan' element={<PlanPage />} />
            {/* <Route path='bolt-ons' element={<AddBoltOnsPage />} /> */}
            <Route path='billing-history' element={<BillingHistoryPage />} />
            <Route path='publisher/:entityId' element={<PublisherPage />} />
            <Route path='publication/:entityId' element={<PublicationPage />} />
            <Route path='issue/:entityId' element={<IssuePage />} />
            <Route path='section/:entityId' element={<SectionPage />} />
            <Route path='article/:articleId' element={<WysiwygPage />} />
            <Route path='template/:templateId' element={<TemplatePage />} />
            <Route
                path='prototype/:entityId/:templateId'
                element={<PrototypePage />}
            />
            <Route
                path='app-build/:entityId/:templateId'
                element={<AppBuildPage />}
            />

            <Route element={<SuperUserRoutes />}>
                <Route
                    path='finish/:entityId/:templateId'
                    element={<FinishPage />}
                />
            </Route>

        </Route>
    </>
);

// Create a small watcher component
function AppVersionWatcher() {
    useVersionCheck(); // your custom hook logic
    return null;
}

ReactDOM.render(
    <StoreProvider>
        <BrowserRouter>
        {/* <TawkMessenger propertyId='6683fd47eaf3bd8d4d172f9e' widgetId='1i1ppaocf' /> */}
            <AppVersionWatcher />
            <Routes>
                {routes}
                <Route path=':country'>{routes}</Route>
            </Routes>
        </BrowserRouter>
    </StoreProvider>,
    document.getElementById('root')
);
