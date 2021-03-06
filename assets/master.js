var app = {
  hoverListenerFunction: function() {
    $(".technique").click(function() {
      console.log("hover done!");
      var technique = this.innerText;
      console.log(technique);
      // Insert the function here:
      // dictionarySearch(technique);
      ytSearch(technique);
    });
  },

  youtubeListenerFunction: function() {
    $(".youtube").off("click");
    $(".youtube").click(function() {
      var title = this.title;
      divmaker(title, "YT");
      ytSearch(title);
    });
  },

  externalListenerFunction: function() {
    $(".recipeContainer").off("click");
    $(".recipeContainer").click(function() {
      window.open(this.getAttribute("href"));
    });
  }
};

// app.searchListenerFunction();
app.hoverListenerFunction();

function divmaker(title, type) {
  // Create a new div that everything is going to be prepended to
  var bodydiv = $("<div>");
  // Add a title for the search!
  var divTitle = $("<h2>");
  divTitle.addClass("title recipeheader");

  if (type === "YT") {
    divTitle.html("Recipes similar to: " + "<i>" + title + "</i>");
  } else {
    divTitle.html("Search results for: " + "<i>" + title + "</i>");
  }

  console.log(title);

  // Add classes for columns is-multiline
  bodydiv.addClass("columns is-multiline");
  // prepend this div
  $("#allthebodydivs").prepend(divTitle, bodydiv);

  // Scroll to the divmaker

  $("html, body").animate(
    {
      scrollTop: parseInt($("allthebodydivs").offset())
    },
    500
  );
}

function cardmaker(array, type) {
  // array should have the following elements:
  // each recipe should have:
  // recipe.title
  // recipe.img
  // recipe.text
  // recipe.url

  //iterate through responses
  for (var i = 0; i < array.length; i++) {

    // create a containerdiv inside the loop 
    var recipe = array[i];

    $overarchingDiv = $("<div>");
    $overarchingDiv.addClass("overarching column is-one-quarter is-primary");

    $containerDiv = $("<div>");
    $containerDiv.addClass("recipeContainer");
    $containerDiv.attr("href", recipe.url);
    $containerDiv.attr("target", "_blank");

    title = $("<h1>").text(recipe.title);
    img = $("<img>").attr("src", recipe.img);


    // Checks if the text is an array and if it is, it provides ingredietns as a list
    if (Array.isArray(recipe.text)) {
      $ingr = $("<div>");
      $ingr.addClass("are-small");

      for (var j = 0; j < recipe.text.length; j++) {
        var $list = $("<button>").text(recipe.text[j]);
        $list.addClass("button is-small healthBtn");
        $ingr.append($list);
      }
    }
    else {
      $ingr = $("<div>").text(recipe.text);
    }

    // add classes to each element and the containerdiv
    title.addClass("title");
    img.addClass("image");
    $ingr.addClass("healthlabels");

    $containerDiv.append(title);
    $containerDiv.append(img);
    $containerDiv.append($ingr);

    // CS: Create a new div for the youtube link
    $youtubeDiv = $("<div>");
    $youtubeDiv.addClass("");

    // If the type is not youtube, create the youtube div. Otherwise, no youtube div elements.
    if (type != "YT") {
      // Add an attribute title with the value recipe.title
      $youtubeDiv.attr("title", recipe.title);

      //button for the youTubeevent listener
      var ytButton = $("<button>", {
        id: "searchYT",
        text: "Find something like it on YouTube!",
        class: "button is-warning is-small"
        //calls on youTube video
      });

      $youtubeDiv.append(ytButton);
      // add a class for this div
      $youtubeDiv.addClass("youtube");
    }
      //adds a youtube image if the thumbnail is a youtube video
      else {
        var ytImgDiv = $("<div>");
        var ytImage = $("<img>");
        ytImage.attr("src", "assets/images/ytimage.png");
        ytImage.addClass("ytImage"),
        ytImgDiv.addClass("ytImgDiv");
        ytImgDiv.append(ytImage);
        $containerDiv.append(ytImgDiv);
      }

    // append the $overarching div and the youtube div above into the overarching div
    $overarchingDiv.append($containerDiv);
    $overarchingDiv.append($youtubeDiv);

    $(".is-multiline:first").append($overarchingDiv);
  }

  // Add listener for clicking youtubeDiv
  app.youtubeListenerFunction();

  app.externalListenerFunction();
}


    