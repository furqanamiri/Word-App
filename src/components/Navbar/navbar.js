import React from "react";
import { ResponsiveNavbar } from "./responsivenavbar";
import StandardNav from "./standardnav";
import useNavbar from "./useNavbar";

export default function Navbar({
  toggleTheme,
  isDark,
  text,
  toggleViewNotes,
  setText,
  viewNotes
}) {
  const {
    toggleSaveFile,
    showFile,
    showPassword,
    handleClosePass,
    handleShowPass,
    showLoginModal,
    LoginModalOpen,
    LoginModalClose,
    LogOut,
    fileType,
    loginUser,
    toggleExportModalOpen,
    toggleExportModalClose,
    exportModal,
    shareModal,
    toggleShareModalOpen,
    toggleShareModalClose,
    changeLink,
    checked,
    textDownload,
    setEdit, theme, copyFunction, noteId, pdf, wordFile, loginToken, editToken
  } = useNavbar({
    toggleTheme,
    isDark,
    text,
    toggleViewNotes,
    setText
  });

  return (
    <>
      <StandardNav
        toggleSaveFile={toggleSaveFile}
        showFile={showFile}
        showPassword={showPassword}
        isDark={isDark}
        textDownload={textDownload}
        toggleTheme={toggleTheme}
        handleClosePass={handleClosePass}
        handleShowPass={handleShowPass}
        showLoginModal={showLoginModal}
        LoginModalOpen={LoginModalOpen}
        LoginModalClose={LoginModalClose}
        LogOut={LogOut}
        toggleViewNotes={toggleViewNotes}
        loginUser={loginUser}
        setEdit={setEdit}
        theme={theme}
        changeLink={changeLink}
        text={text}
        fileType={fileType}
        copyFunction={copyFunction}
        noteId={noteId} pdf={pdf}
        wordFile={wordFile}
        viewNotes={viewNotes}
        editToken={editToken}
        checked={checked}


      />

      <ResponsiveNavbar
        toggleTheme={toggleTheme}
        toggleSaveFile={toggleSaveFile}
        loginUser={loginUser}
        showFile={showFile}
        LoginModalOpen={LoginModalOpen}
        LogOut={LogOut}
        toggleExportModalOpen={toggleExportModalOpen}
        toggleExportModalClose={toggleExportModalClose}
        exportModal={exportModal}
        shareModal={shareModal}
        toggleShareModalOpen={toggleShareModalOpen}
        toggleShareModalClose={toggleShareModalClose}
        isDark={isDark}
        text={text}
        fileType={fileType}
      textDownload={textDownload}
      toggleViewNotes={toggleViewNotes}
      showPassword={showPassword}
      handleClosePass={handleClosePass}
      handleShowPass={handleShowPass}
      showLoginModal={showLoginModal}
      LoginModalClose={LoginModalClose} pdf={pdf}
      wordFile={wordFile}
      viewNotes={viewNotes}
      editToken={editToken}
      checked={checked}
      changeLink={changeLink}
      />
    </>
  );
}
