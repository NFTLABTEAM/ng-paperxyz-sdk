'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">paper-components documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/PaperAngularClientSdkModule.html" data-type="entity-link" >PaperAngularClientSdkModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PaperAngularClientSdkModule-9cf50450098a50083b6b3fd38807f5b3fecdda4cf0eae8d243bc2cc2a29b112107b06bb141f9140d7670a3bf7d3f4a57bcdabd4f2257d83b7da807343342658d"' : 'data-target="#xs-components-links-module-PaperAngularClientSdkModule-9cf50450098a50083b6b3fd38807f5b3fecdda4cf0eae8d243bc2cc2a29b112107b06bb141f9140d7670a3bf7d3f4a57bcdabd4f2257d83b7da807343342658d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PaperAngularClientSdkModule-9cf50450098a50083b6b3fd38807f5b3fecdda4cf0eae8d243bc2cc2a29b112107b06bb141f9140d7670a3bf7d3f4a57bcdabd4f2257d83b7da807343342658d"' :
                                            'id="xs-components-links-module-PaperAngularClientSdkModule-9cf50450098a50083b6b3fd38807f5b3fecdda4cf0eae8d243bc2cc2a29b112107b06bb141f9140d7670a3bf7d3f4a57bcdabd4f2257d83b7da807343342658d"' }>
                                            <li class="link">
                                                <a href="components/PaperCreateWalletComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaperCreateWalletComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaperPayWithCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaperPayWithCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PaperAngularClientSdkModule-9cf50450098a50083b6b3fd38807f5b3fecdda4cf0eae8d243bc2cc2a29b112107b06bb141f9140d7670a3bf7d3f4a57bcdabd4f2257d83b7da807343342658d"' : 'data-target="#xs-injectables-links-module-PaperAngularClientSdkModule-9cf50450098a50083b6b3fd38807f5b3fecdda4cf0eae8d243bc2cc2a29b112107b06bb141f9140d7670a3bf7d3f4a57bcdabd4f2257d83b7da807343342658d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaperAngularClientSdkModule-9cf50450098a50083b6b3fd38807f5b3fecdda4cf0eae8d243bc2cc2a29b112107b06bb141f9140d7670a3bf7d3f4a57bcdabd4f2257d83b7da807343342658d"' :
                                        'id="xs-injectables-links-module-PaperAngularClientSdkModule-9cf50450098a50083b6b3fd38807f5b3fecdda4cf0eae8d243bc2cc2a29b112107b06bb141f9140d7670a3bf7d3f4a57bcdabd4f2257d83b7da807343342658d"' }>
                                        <li class="link">
                                            <a href="injectables/PaperCreateWalletService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaperCreateWalletService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaperEventsHandlerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaperEventsHandlerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaperPayWithCardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaperPayWithCardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/PaperCreateWalletComponent.html" data-type="entity-link" >PaperCreateWalletComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PaperPayWithCardComponent.html" data-type="entity-link" >PaperPayWithCardComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/PaperCreateWalletData.html" data-type="entity-link" >PaperCreateWalletData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaperPayWithCardData.html" data-type="entity-link" >PaperPayWithCardData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaperPayWithCardInputs.html" data-type="entity-link" >PaperPayWithCardInputs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaperPopupConfig.html" data-type="entity-link" >PaperPopupConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaperSDKError.html" data-type="entity-link" >PaperSDKError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaperSDKPayWithCardStyleOptions.html" data-type="entity-link" >PaperSDKPayWithCardStyleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentSuccessResult.html" data-type="entity-link" >PaymentSuccessResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReviewResult.html" data-type="entity-link" >ReviewResult</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});