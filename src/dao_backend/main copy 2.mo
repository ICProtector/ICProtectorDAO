import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Option "mo:base/Option";
import Blob "mo:base/Blob";
import Bool "mo:base/Bool";
import Map "mo:base/HashMap";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Buffer "mo:base/Buffer";

actor ProposalManager {
  // Define the types for the system
  type Proposal = {
    id : Text;
    creator : Principal;
    topicName : Text;
    description : Text;
    image : Text;
    creationTime : Int;
    endTime : Int;
    status : Bool;
    twoOptionType : Bool;
    twoOptionOptions : OptionTwoStatus;
    options : Option;
  };
  type Option = {
    op1 : Text;
    count1 : Int;
    op2 : Text;
    count2 : Int;
    op3 : Text;
    count3 : Int;
    op4 : Text;
    count4 : Int;
    op5 : Text;
    count5 : Int;
  };

  type Vote = {
    voter : Principal;
    proposalId : Text;
    correctOption : Text;
    voteTime : Int;
    claimed : Bool;
    voteWeight : Int;
  };

  type OptionTwoStatus = {
    yesVotes : Nat;
    noVotes : Nat;
  };

  type Reward = {
    correctOption : Text;
    proposalId : Text;
    maxVotes : Int;
  };
  //====================================================

  public type Subaccount = Blob;
  public type Tokens = Nat;
  public type Memo = Blob;
  public type Timestamp = Nat64;
  public type Duration = Nat64;
  public type TxIndex = Nat;
  public type Account = { owner : Principal; subaccount : ?Subaccount };
  public type Result<T, E> = { #Ok : T; #Err : E };

  type Account__1 = {
    owner : Principal;
    subaccount : Blob;
  };

  type TransferType = {
    from_subaccount : ?Subaccount;
    to : Account;
    amount : Tokens;
    fee : ?Tokens;
    memo : ?Memo;
    created_at_time : ?Timestamp;
  };
  public type CommonError = {
    #InsufficientFunds : { balance : Tokens };
    #BadFee : { expected_fee : Tokens };
    #TemporarilyUnavailable;
    #GenericError : { error_code : Nat; message : Text };
  };

  public type DeduplicationError = {
    #TooOld;
    #Duplicate : { duplicate_of : TxIndex };
    #CreatedInFuture : { ledger_time : Timestamp };
  };

  public type TransferError = DeduplicationError or CommonError or {
    #BadBurn : { min_burn_amount : Tokens };
  };

  //===================================================
  // Stable storage to persist data across upgrades
  private stable var mapEntries : [(Text, Proposal)] = [];
  var map = Map.HashMap<Text, Proposal>(0, Text.equal, Text.hash);

  // private stable var ownerEntries : [(Principal, Vote)] = [];
  // var owners = Map.HashMap<Principal, Vote>(0, Principal.equal, Principal.hash);
  private stable var ownerEntries : [(Principal, [Vote])] = [];
  var owners = Map.HashMap<Principal, Buffer.Buffer<Vote>>(0, Principal.equal, Principal.hash);

  private stable var rewardEntries : [(Text, Reward)] = [];
  var rewards = Map.HashMap<Text, Reward>(0, Text.equal, Text.hash);

  // // Create a new proposal
  public shared (msg) func createProposal(id : Text, topicName1 : Text, description1 : Text, arImage : Text, argStartdate : Int, argEndDate : Int, twoOptionType : Bool, argoptions : Option) : async Proposal {
    let currentTime = Time.now();
    // let proposalId = proposals.size() + 1; // Naive auto-increment, should be improved
    let owner = msg.caller;
    let newProposal : Proposal = {
      id = id;
      creator = owner; // Getting the caller's Principal
      topicName = topicName1;
      description = description1;
      image = arImage;
      creationTime = currentTime;
      endTime = argEndDate;
      status = true;
      twoOptionType = twoOptionType;
      twoOptionOptions = {
        yesVotes = 0;
        noVotes = 0;
      };
      options = argoptions;
    };
    map.put(id, newProposal);
    return newProposal;
  };

  public query func getProposal(id : Text) : async ?Proposal {
    return map.get(id);
  };
  public query func getWinner(id : Text) : async ?Reward {
    return rewards.get(id);
  };

  public shared (msg) func winnersSelect(proposalId : Text) : async Text {

    let currentTime = Time.now();
    switch (map.get(proposalId)) {
      case (?proposal) {
        if (currentTime > proposal.endTime) {
          var proposalStatus = false; // Mark the proposal as finalized
          var winningOption = "";
          var maxVotes : Int = 0;
          if (proposal.twoOptionType) {
            // For two-option proposals
            if (proposal.twoOptionOptions.yesVotes > proposal.twoOptionOptions.noVotes) {
              winningOption := "yes";
              maxVotes := proposal.twoOptionOptions.yesVotes;
            } else {
              winningOption := "no";
              maxVotes := proposal.twoOptionOptions.noVotes;
            };
          } else {
            // For multi-option proposals
            var options = [proposal.options.op1, proposal.options.op2, proposal.options.op3, proposal.options.op4, proposal.options.op5];
            var counts = [proposal.options.count1, proposal.options.count2, proposal.options.count3, proposal.options.count4, proposal.options.count5];
            for (j in Iter.range(0, 4)) {
              if (counts[j] > maxVotes) {
                maxVotes := counts[j];
                winningOption := options[j];
              };
            };
          };

          Debug.print(debug_show (winningOption));
          Debug.print(debug_show (maxVotes));
          let newReward : Reward = {
            correctOption = winningOption;
            proposalId = proposalId;
            maxVotes = maxVotes;
          };
          rewards.put(proposalId, newReward);
        } else {
          return "failed";
        };
      };
      case (null) {
        return "null";
      };
    };

    // endTime
    return "success";
  };

  public shared (msg) func checkClaimRewards(proposalId : Text) : async Text {
    let owner = msg.caller;
    switch (rewards.get(proposalId)) {
      case (null) {
        return "No Reward yet";
      };
      case (?reward) {

        switch (owners.get(owner)) {
          case (null) {
            return "Not voted here";
          };
          case (?resultOwner) {

            let entries = Iter.toArray(owners.entries());
            // Use Iter.fromArray to create an iterable from the array
            for ((principal, votesBuffer) in Iter.fromArray(entries)) {
              // Iterate over all votes for the current principal
              let votes = Buffer.toArray<Vote>(votesBuffer);
              // Use Iter.fromArray to iterate over votes
              var i = 0;
              for (vote in Iter.fromArray(votes)) {
                if (vote.correctOption == reward.correctOption and vote.proposalId == proposalId) {
                  let updatedListing = {
                    vote with
                    claimed = true;
                  };

                  let cowsay = actor ("eoxkn-6qaaa-aaaap-ab3ta-cai") : actor {
                    icrc1_transfer : (TransferType) -> async Result<TxIndex, TransferError>;
                  };
                  let mydata : TransferType = {
                    to = {
                      owner = Principal.fromText("xsvih-nzaqn-q3edk-ijqkq-3qymg-qxf4z-pqou7-g5t2r-36ukb-ioiqc-7qe");
                      subaccount = null;
                    };
                    amount = 10 * 100000000;
                    fee = ?50;
                    memo = null;
                    from_subaccount = null;
                    created_at_time = null;
                  };
                  // Assuming `cowsay.icrc1_transfer(mydata)` is an asynchronous call you're making
                  let datastore = await cowsay.icrc1_transfer(mydata);

                  resultOwner.put(i, updatedListing);
                  return "success 1";
                };
                i += 1;
              };
              return "failed";
            };
            // Return null if no matching vote is found
          };
        };

      };
    };
    return "success";
  };
  public shared (msg) func castVote(proposalId : Text, selectedOption : Text) : async Text {
    let owner = msg.caller;
    switch (map.get(proposalId)) {
      case (null) {
        return "No id";
      };
      case (?proposal) {
        let currentTime = Time.now();
        let newVote = {
          voter = msg.caller;
          proposalId = proposalId;
          correctOption = selectedOption;
          voteTime = currentTime;
          claimed = false;
          voteWeight = 1;
        };
        if (proposal.twoOptionType == true) {

          let store = proposal.twoOptionOptions.yesVotes +1;
          if (selectedOption == "yes") {
            let updatedOptions = {
              yesVotes = proposal.twoOptionOptions.yesVotes +1;
              noVotes = proposal.twoOptionOptions.noVotes;
            };
            let updatedListing = {
              proposal with
              twoOptionOptions = updatedOptions;
            };
            Debug.print(debug_show (("=>", updatedOptions)));

            map.put(proposalId, updatedListing);

            switch (owners.get(owner)) {
              case (?x) {
                x.add(newVote);
                let res = owners.put(owner, x);
              };
              case (null) {
                var a = Buffer.Buffer<Vote>(0);
                a.add(newVote);
                owners.put(owner, a);
              };
            };
            // owners.put(msg.caller, newVote);
          } else {
            let updatedOptions = {
              yesVotes = proposal.twoOptionOptions.yesVotes;
              noVotes = proposal.twoOptionOptions.noVotes +1;
            };
            let updatedListing = {
              proposal with
              twoOptionOptions = updatedOptions;
            };
            Debug.print(debug_show (("=>", updatedOptions)));

            map.put(proposalId, updatedListing);
            // owners.put(msg.caller, newVote);
            switch (owners.get(owner)) {
              case (?x) {
                x.add(newVote);
                let res = owners.put(owner, x);
              };
              case (null) {
                var a = Buffer.Buffer<Vote>(0);
                a.add(newVote);
                owners.put(owner, a);
              };
            };
          };
          return "true false";
        } else {
          let updatedOptions = {
            op1 = proposal.options.op1;
            count1 = if (selectedOption == proposal.options.op1) {
              proposal.options.count1 +1;
            } else {
              proposal.options.count1;
            };

            op2 = proposal.options.op1;
            count2 = if (selectedOption == proposal.options.op2) {
              proposal.options.count2 +1;
            } else {
              proposal.options.count2;
            };
            op3 = proposal.options.op3;
            count3 = if (selectedOption == proposal.options.op3) {
              proposal.options.count3 +1;
            } else {
              proposal.options.count3;
            };

            op4 = proposal.options.op4;
            count4 = if (selectedOption == proposal.options.op4) {
              proposal.options.count4 +1;
            } else {
              proposal.options.count4;
            };

            op5 = proposal.options.op5;
            count5 = if (selectedOption == proposal.options.op5) {
              proposal.options.count5 +1;
            } else {
              proposal.options.count5;
            };
          };
          let updatedListing = {
            proposal with
            options = updatedOptions;
          };
          // Save the updated proposal
          Debug.print(debug_show (("=>", updatedOptions)));

          // Record the voter's vote

          map.put(proposalId, updatedListing);

          switch (owners.get(owner)) {
            case (?x) {
              x.add(newVote);
              let res = owners.put(owner, x);
            };
            case (null) {
              var a = Buffer.Buffer<Vote>(0);
              a.add(newVote);
              owners.put(owner, a);
            };
          };

          return "success";
        };

      };
    };
  };

  public shared (msg) func QueryAllUserVotes() : async [Vote] {
    let owner = msg.caller;
    switch (owners.get(owner)) {
      case (?x) {
        Debug.print(debug_show (("=>", owner)));

        return Buffer.toArray<Vote>(x);
      };
      case (null) {
        return [];
      };
    };

  };

  // // Upgrade handlers for stable storage
  system func preupgrade() {
    mapEntries := Iter.toArray(map.entries());
    rewardEntries := Iter.toArray(rewards.entries());

    let Entries = Iter.toArray(owners.entries());
    var data = Map.HashMap<Principal, [Vote]>(0, Principal.equal, Principal.hash);

    for (x in Iter.fromArray(Entries)) {
      data.put(x.0, Buffer.toArray<Vote>(x.1));
    };
    ownerEntries := Iter.toArray(data.entries());
  };

  system func postupgrade() {
    map := HashMap.fromIter<Text, Proposal>(mapEntries.vals(), 1, Text.equal, Text.hash);
    rewards := HashMap.fromIter<Text, Reward>(rewardEntries.vals(), 1, Text.equal, Text.hash);
    let his = HashMap.fromIter<Principal, [Vote]>(ownerEntries.vals(), 1, Principal.equal, Principal.hash);
    let Entries = Iter.toArray(his.entries());
    for (x in Iter.fromArray(Entries)) {
      owners.put(x.0, Buffer.fromArray<Vote>(x.1));
    };

    // Reconstruct in-memory maps from stable storage after upgrade
  };
};
