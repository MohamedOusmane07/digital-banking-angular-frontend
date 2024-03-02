export interface BankAccountDTO {
  type:           string;
  id:             string;
  balance:        number;
  currency:       string;
  dateCreation:   Date;
  dateExpiration: Date;
  status:         string;
  customerDTO:    CustomerDTO;
  overDraft?:     number;
  interestRate?:  number;
}

export interface CustomerDTO {
  id:        number;
  firstName: string;
  lastName:  string;
  email:     string;
}
