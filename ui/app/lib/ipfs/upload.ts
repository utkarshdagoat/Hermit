export async function uploadData(data: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", data);

  const res = await fetch("http://10.81.37.204:34463/upload", {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const abc = await res.json();
    return abc.cid;
  } else {
    console.error("Failed to upload data");
    return "";
  }
}
