export const homeDe = {
  receive: {
    label: 'Erhalten',
    request: 'Anfrage',
    ReceiveScreen: {
      loading: '$t(common.loading)...',
      copiedToClipboard: '$t(common.copiedToClipboard)',
      request: '$t(home.receive.request)',
      learnMore: '$t(common.learnMore)',
    },
    ReceiveAmountInputScreen: {
      request: '$(home.receive.request)',
      continue: '$(common.continue)',
    },
    ReceiveAmountScreen: {
      shareYourAddress: '$(common.shareYourAddress)',
      request: '$t(home.receive.request)',
      share: '$(common.share)',
      complete: '$(common.complete)',
    },
  },
  send: {
    label: 'Senden',
    SendScanScreen: {
      QuaiPayContactBottomSheet: {
        error: {
          invalidAddress: {
            message: 'Ungültige Adresse',
            moreInfo: 'Bitte gültige Addresse eingeben um fortzufahren.',
          },
        },
        viewAll: 'Alle anzeigen',
        searchByAddress: 'Nach Adresse suchen',
      },
    },
    SendAmountScreen: {
      title: '$(home.send.label)',
      to: '$(common.to)',
      yourBalance: 'Ihr Guthaben: {{ balance }} {{ unit }}',
      includeTip: '$(home.send.includeTip)',
      continue: '$(common.continue)',
    },
    SendConfirmationScreen: {
      from: '$(common.from)',
      sentTo: 'Gesendet an',
      saveToContacts: 'Empfänger zu Kontakten hinzufügen',
      viewOnExplorer: 'Transaktion auf QuaiSnap.com anzeigen',
      savedContactsSnackBar: {
        message: '$(common.success)',
        moreInfo: 'Empfänger zu Kontakten hinzugefügt',
      },
      noInternetSnackBar: {
        message: 'Keine Internetverbindung',
        moreInfo: 'Bitte überprüfen Sie Ihre Internetverbindung!',
      },
      txStatusIndicator: {
        paymentConfirmed: 'Zahlung bestätigt',
        paymentFailed: 'Zahlung fehlgeschlagen.',
        paymentPending: 'Zahlung ausstehend...',
      },
      bottomButton: {
        retry: 'Wiederholen',
        complete: '$(common.complete)',
      },
      banner: {
        somethingWrong: 'Etwas ist schief gelaufen.',
        retryTransaction: 'Bitte noch einmal versuchen.',
      },
    },
    SendTipScreen: {
      to: '$(common.to)',
      continue: '$(common.continue)',
      tip: 'Tip',
      noTip: 'Kein Tip',
      includeTip: 'Trinkgeld einbeziehen?',
      customTip: 'Benutzerdefiniertes Trinkgeld',
    },
    SendOverviewScreen: {
      title: '$(home.send.label)',
      to: '$(common.to) {{ receiver }}',
      learnMore: '$(common.learnMore)',
      sending: 'Senden',
      includedTip: 'Trinkgeld einbezogen',
      gasFee: 'Gasgebühr',
      totalCost: 'Total Cost',
      pay: 'Bezahlen ${{ amount }}',
      noFundsBanner: {
        title: 'Unzureichende Mittel.',
        description: 'Du brauchst mehr QUAI.',
      },
    },
  },
  HomeScreen: {
    receiveLabel: '$(home.receive.label)',
    sendLabel: '$(home.send.label)',
  },
};