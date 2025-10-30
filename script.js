function generateMetadata() {
  const metadata = {
    "@context": "https://schema.org/",
    "@type": "SoftwareApplication",
    "name": document.getElementById("name").value,
    "softwareVersion": document.getElementById("version").value,
    "programmingLanguage": document.getElementById("language").value,
    "codeRepository": document.getElementById("repo").value,
    "license": document.getElementById("license").value,
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "cwl:baseCommand",
        "value": document.getElementById("command").value
      },
      {
        "@type": "PropertyValue",
        "name": "cwl:inputs",
        "value": document.getElementById("inputs").value
      },
      {
        "@type": "PropertyValue",
        "name": "cwl:outputs",
        "value": document.getElementById("outputs").value
      }
    ]
  };

  const formatted = JSON.stringify(metadata, null, 2);
  document.getElementById("output").value = formatted;
  return formatted;
}

function downloadMetadata() {
  const json = generateMetadata();
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "metadata.json";
  a.click();
  URL.revokeObjectURL(url);
}
