// This is the function.
String.prototype.format = function (args) {
    var str = this;
    return str.replace(String.prototype.format.regex, function(item) {
        var intVal = parseInt(item.substring(1, item.length - 1));
        var replace;
        if (intVal >= 0) {
            replace = args[intVal];
        } else if (intVal === -1) {
            replace = "{";
        } else if (intVal === -2) {
            replace = "}";
        } else {
            replace = "";
        }
        return replace;
    });
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");


angular.module('todoApp', [])
    .controller('TodoListController', function($scope) {
        var prestring = '<?xml version="1.0" encoding="utf-8"?><SettingsBundle><SettingsGroup Id="QAVerificationSettings"><Setting Id="ElementContextExclusionValue">True</Setting><Setting Id="ExclusionStringValue">True</Setting><Setting Id="AbsoluteLengthElements">True</Setting><Setting Id="RegExRules">True</Setting><Setting Id="TrademarksSymbols">True</Setting><Setting Id="TrademarksSymbols0">®</Setting><Setting Id="TrademarksSymbols1">©</Setting><Setting Id="TrademarksSymbols2">™</Setting><Setting Id="TrademarksSymbols3">(c)</Setting><Setting Id="TrademarksSymbols4">(r)</Setting><Setting Id="CheckWordList">True</Setting><Setting Id="WrongWordPairs">True</Setting>';
        var poststring = '</SettingsGroup></SettingsBundle>';
        $scope.source="";
        $scope.$watch('source', function(){
            $scope.result ='';
            $scope.fsource = $scope.source.split('\n');
            //console.log($scope.fsource);
            var index =0;
            angular.forEach($scope.fsource, function (item) {
                // Sample usage.
                var str = '<Setting Id="WrongWordPairs' + index +'"><WrongWordDef xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.datacontract.org/2004/07/Sdl.Verification.QAChecker"><CorrectWord>{1}</CorrectWord><WrongWord>{0}</WrongWord><_CorrectWord>{1}</_CorrectWord><_WrongWord>{0}</_WrongWord></WrongWordDef></Setting>';
                str = str.format(item.split('\t'));
                $scope.result +=str;
                index +=1;
            })
        });

        //$scope.source;
        $scope.download=  function(){
            var file = new File([prestring + $scope.result + poststring], "錯別字.sdlqasettings", {type: "text/plain;charset=utf-8"});
            saveAs(file);
        }


    });
