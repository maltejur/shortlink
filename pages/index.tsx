import {
  Button,
  Fieldset,
  Input,
  Spacer,
  Text,
  useToasts,
} from "@geist-ui/react";
import React, { useEffect, useState } from "react";
import generateId from "lib/generateId";
import { validateShortId, validateUrl } from "lib/validate";
import { Clipboard } from "@geist-ui/react-icons";
import copyToClipboard from "lib/copyToClipboard";

export default function Home() {
  const [targetUrl, setTargetUrl] = useState("");
  const [shortId, setShortId] = useState(generateId());
  const [errTargetUrl, setErrTargetUrl] = useState<string>();
  const [errShortId, setErrShortId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);
  const [, setToast] = useToasts();

  useEffect(() => {
    setErrTargetUrl(undefined);
    setError(false);
  }, [targetUrl]);

  useEffect(() => {
    setErrShortId(undefined);
    setError(false);
  }, [shortId]);

  return (
    <div className="root">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          let valid = true;
          if (!validateUrl(targetUrl)) {
            valid = false;
            setErrTargetUrl("Invalid URL");
            setError(true);
          }
          if (!validateShortId(shortId)) {
            valid = false;
            setErrShortId("Invalid Short ID");
            setError(true);
          }
          if (valid) {
            setLoading(true);
            const response = await fetch(
              `/api/create?id=${encodeURIComponent(
                shortId
              )}&target=${encodeURIComponent(targetUrl)}`
            );
            setLoading(false);
            if (response.ok) {
              setComplete(true);
              setShortId(
                (shortId) =>
                  `${window.location.protocol}//${window.location.host}/${shortId}`
              );
            } else setError(true);
          }
        }}
      >
        <Fieldset>
          <Fieldset.Content>
            <Fieldset.Title>
              <Text h3 my={0}>
                shortlink
              </Text>
            </Fieldset.Title>
            <Fieldset.Subtitle>
              <Spacer h={1} />
              <Input
                disabled={loading || complete}
                width="300px"
                required
                type={errTargetUrl ? "error" : "default"}
                value={targetUrl}
                onChange={(event) => setTargetUrl(event.target.value)}
              >
                Target URL
              </Input>
              <Spacer h={0.4} />
              <Text small type="error">
                {errTargetUrl || ""}
              </Text>
              <Spacer h={1} />
              <Input
                readOnly={loading || complete}
                label={
                  !complete &&
                  `${process.browser && window.location.protocol}//${
                    process.browser && window.location.host
                  }/`
                }
                width="300px"
                required
                type={errShortId ? "error" : "default"}
                value={shortId}
                onChange={(event) => setShortId(event.target.value)}
                onClick={
                  complete
                    ? () => {
                        copyToClipboard(shortId);
                        setToast({
                          text: "Copied to Clipboard",
                          type: "success",
                        });
                      }
                    : () => {}
                }
              >
                Shortened Link
              </Input>
              <Spacer h={0.4} />
              <Text small type="error">
                {errShortId || ""}
              </Text>
            </Fieldset.Subtitle>
          </Fieldset.Content>
          <Fieldset.Footer>
            <Spacer />
            <Button
              auto
              scale={0.6}
              type={error ? "error" : "success"}
              htmlType="submit"
              loading={loading}
              disabled={complete}
            >
              Shorten Link
            </Button>
          </Fieldset.Footer>
        </Fieldset>
      </form>
      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}
