
//document.cookie = 'same-site-cookie=foo; SameSite=Lax';
//document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
console.log('Came here 1');
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
console.log('Came here 2');
localStorage.clear();


function saveIssue(e) {

    console.log('Came here 3');
    issueDesc = document.getElementById('issueDescInput').value;
    issueSeverity =  document.getElementById('issueSeverityInput').value;
    issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    issueId = chance.guid();
    issueStatus = 'Open';

    console.log(issueDesc);
    console.log(issueSeverity);
    console.log(issueAssignedTo);
    console.log(issueId);
    console.log(issueStatus);

    var issue = {
        id: issueId ,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    };

    if (localStorage.getItem('issues') == null) 
    {
        console.log("First Time");
        var  issues = [] ;   
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues))

    } 
    else 
    {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues))

    }


    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
}


function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(i = 0; i < issues.length ; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues()
}

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(i = 0; i < issues.length ; i++) {
        if (issues[i].id == id) {
            // remove 
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues()
}

function fetchIssues() {


    var issues = JSON.parse(localStorage.getItem('issues'));
    //console.log(issues)

    var issuesListe = document.getElementById('issuesList');
    issuesListe.innerHTML = '';

    for(i = 0; i < issues.length ; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class= "well">' +
        '<h6>Issue Id: ' + id + '</h6> ' +
        '<h3><strong>' + desc + '</strong></h3> ' +
        '<p><span class="alert alert-success" role="alert">' + status + '</span></p>'  +
        '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
        '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
        '<a href="#" onClick="setStatusClosed(\''+id+'\')" class="btn btn-warning" > Close</a>' +
        '<a href="#" onClick="deleteIssue(\''+id+'\')" class="btn btn-delete" > Delete</a>' +
        '</div>'

     
    }
    
}